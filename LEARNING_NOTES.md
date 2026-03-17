# 상태관리 학습 노트

todomate 클론 프로젝트를 통해 배운 내용 정리

---

## 1. 컴포넌트 설계

### UI와 도메인 로직 분리
- UI 컴포넌트(`ui/`)는 도메인을 모르게 설계. props로 데이터를 주입받는 구조
- 도메인 컴포넌트(`todo/`, `goal/`)가 UI 컴포넌트를 감싸서 데이터를 연결
- 예: `ui/Calendar`는 순수 레이아웃, `todo/TodoCalendar`가 useCalendar 훅과 todo 데이터를 주입
- 예: `ui/Graph`는 색상만 받아서 렌더링, `todo/TodoGraph`가 remaining 카운트를 오버레이

### 관심사가 같은 것끼리 폴더로 묶기
- 목표나 투두에 대한 기능 요구사항이 늘어남에 따라 여러 관심사가 섞여서 복잡해질 것
- `calendar/`, `todo/`, `goal/`, `ui/` 폴더로 관심사별 분리

### 커스텀훅으로 로직 추출
- `useCalendar` — 캘린더 네비게이션 로직을 컴포넌트에서 분리
- 반환값 네이밍도 중요: `{ year, month, weekdays, days, navigate, check }` 처럼 그룹화

---

## 2. 상태의 분류

| 분류 | 설명 | 예시 | 적합한 도구 |
|------|------|------|------------|
| UI 상태 | 화면 표현에만 관련 | 모달 열림, 선택된 날짜 | useState |
| 서버 상태 | 서버에 원본이 있는 데이터 | Goal 목록, Todo 목록 | TanStack Query |
| 폼 상태 | 사용자 입력의 임시 상태 | 목표 입력값, 할 일 입력값 | useState |
| URL 상태 | URL에 인코딩된 상태 | 현재 페이지, 필터 조건 | react-router |

> **핵심**: 상태관리의 본질은 도구가 아니라 "어떤 상태를 어디에 둘 것인가"라는 판단력

---

## 3. Props Drilling의 한계

- `onToggleTodo`가 App → Feed → TodoSection → TodoList → TodoListItem까지 5단계
- 중간 컴포넌트(Feed, TodoSection, TodoList)는 자기가 안 쓰는 props를 받아서 넘기기만 함
- 상태가 복잡한 게 아니라 **배선이 복잡한** 상태

### setState를 직접 넘기면?
- 컴포넌트가 상태 구조를 알아야 함 (캡슐화 깨짐)
- 의도가 불명확 (`toggleTodo(id)` vs `setTodos(prev => prev.map(...))`)
- 나중에 Context/Zustand로 전환할 때 모든 하위 컴포넌트 수정 필요

---

## 4. 커스텀훅만으로는 상태 공유 불가

```tsx
// A와 B가 각각 호출하면 별개의 상태
const A = () => { const { todos } = useTodos(); }; // 인스턴스 1
const B = () => { const { todos } = useTodos(); }; // 인스턴스 2
```

- 커스텀훅은 **로직을 재사용**하는 거지, **상태를 공유**하는 게 아님
- 상태 공유를 위해서는 Context, Zustand, Jotai 등이 필요
- Context + 커스텀훅 조합: Context가 상태 공유, 훅이 인터페이스 정리

---

## 5. Context 설계

### 도메인별 분리 필요
- GoalContext / TodoContext를 하나로 합치면 todo 변경 시 goals만 쓰는 컴포넌트(Graph)도 리렌더링
- 도메인별로 분리해야 불필요한 리렌더링 방지

### 파일 분리 (Fast Refresh 대응)
```
context/
├── goalContext.ts      ← createContext + 타입 (비컴포넌트)
├── todoContext.ts      ← createContext + 타입 (비컴포넌트)
├── GoalProvider.tsx    ← Provider 컴포넌트만
└── TodoProvider.tsx    ← Provider 컴포넌트만
hooks/
├── useGoals.ts         ← useContext 래퍼
└── useTodos.ts         ← useContext 래퍼
```
- `.tsx` 파일은 컴포넌트만 export해야 Fast Refresh가 동작

---

## 6. 라이브러리별 비동기 처리 차이

### useState + useEffect
- 가장 기본. 컴포넌트에서 직접 fetch + setState
- 로딩/에러를 매번 수동 관리

### Context + 커스텀훅
- Provider 안에서 useEffect + fetch
- 하위 컴포넌트는 훅으로 데이터 접근. props drilling 제거
- 단 매 요청마다 try/catch 보일러플레이트 반복

### Zustand
- **Store가 데이터를 소유**. async action으로 fetch
- `StoreInitializer`로 App 레벨에서 한 번 초기화
- 컴포넌트는 store를 구독만 함. Provider 불필요
- selector로 리렌더링 범위 제어 가능

### Jotai
- **Async atom**이 첫 읽기 시 자동 fetch
- Suspense와 자연스럽게 통합
- 컴포넌트에 useEffect 없음 — atom 읽기 = 데이터 요청

### TanStack Query
- `useQuery`가 **선언적으로** 자동 fetch/캐싱/리페칭
- `useMutation` + `invalidateQueries`로 CRUD
- 컴포넌트는 "이 데이터 필요해"라고 선언만 하면 됨

---

## 7. 서버 상태 vs 클라이언트 상태

- **클라이언트 상태**: 내가 소유, 즉시 변경 가능, 100% 신뢰
- **서버 상태**: 서버가 소유, 클라이언트는 사본일 뿐, 언제든 stale해질 수 있음

Zustand/Jotai로 서버 상태를 관리하면 캐싱, 자동 리페칭, 중복 요청 방지, 에러 복구를 전부 직접 구현해야 함 → 결국 TanStack Query를 직접 만드는 꼴

### Optimistic Update 비교
- **직접 구현**: UI 먼저 업데이트 → API 호출 → 실패 시 롤백 (롤백 로직, 동시 mutation 충돌 직접 관리)
- **TanStack Query**: `onMutate`(낙관적 업데이트) → `onError`(자동 롤백) → `onSettled`(최종 동기화) 구조화된 흐름 제공

---

## 8. 실무 최적 조합

- **서버 상태** → TanStack Query (캐싱, 동기화, 리페칭 전담)
- **클라이언트/UI 상태** → Zustand 또는 Jotai (가벼운 전역 상태)
- **컴포넌트 로컬 상태** → useState (모달, 폼 입력 등)

---

## 9. 유틸리티 판단

### dayjs 같은 라이브러리
- `dayjs().date()`, `dayjs().month()` 정도만 쓰면 `new Date()`로 충분
- dayjs가 빛나는 건: 날짜 포맷팅, 상대 시간, 날짜 연산, 로케일/타임존 처리

### useReducer
- 지금처럼 단순 CRUD에서는 useState로 충분
- 상태 전이가 복잡하거나 (주문 상태 등), 여러 상태가 연관되어 같이 바뀔 때 적합

---

## 브랜치 구조

| 브랜치 | 상태관리 | API |
|--------|----------|-----|
| `chapter-1-only-ui` | 없음 (UI만) | 없음 |
| `chapter-2-useState` | useState + props drilling | 없음 |
| `chapter-2-context` | Context + 커스텀훅 | 없음 |
| `chapter-3-usestate-api` | useState + props drilling | json-server |
| `chapter-3-api` | Context + 커스텀훅 | json-server |
| `chapter-4-zustand` | Zustand | json-server |
| `chapter-4-jotai` | Jotai (async atom + Suspense) | json-server |
| `chapter-5-tanstack-query` | TanStack Query | json-server |
