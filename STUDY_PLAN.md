# 상태관리 학습 계획

todomate 클론 프로젝트를 활용한 단계별 상태관리 학습 로드맵

## 핵심 원칙

학습 전 반드시 이해해야 할 상태의 분류:

| 분류 | 설명 | 예시 |
|------|------|------|
| UI 상태 | 화면 표현에만 관련된 상태 | 모달 열림/닫힘, 선택된 날짜, 사이드바 토글 |
| 서버 상태 | 서버에 원본이 있고 클라이언트는 사본을 캐싱 | Goal 목록, Todo 목록 |
| 폼 상태 | 사용자 입력의 임시 상태 | 목표 입력값, 할 일 입력값 |
| URL 상태 | URL에 인코딩된 상태 | 현재 페이지, 필터/정렬 조건 |

> 각 Step을 진행하면서 "지금 다루는 상태가 어떤 분류인지" 항상 의식할 것.
> 상태관리의 핵심은 도구가 아니라 **어떤 상태를 어디에 둘 것인가**라는 판단력이다.

---

## Step 1. Props Drilling — 상태의 흐름을 눈으로 보기

- App에 Goal, Todo 데이터를 useState로 정의
- 페이지 → 컴포넌트로 props를 내려서 데이터 전달
- 캘린더 선택 날짜에 따라 TodoSection이 변하는 구조 구현
- 핸들러 함수도 props로 전달 (onAdd, onToggle, onDelete 등)
- **관찰 포인트**
  - 몇 단계를 거쳐 props가 전달되는가?
  - 중간 컴포넌트가 자기는 안 쓰는 props를 받아 넘기고 있지 않은가?
  - 상태를 변경하는 함수가 정의된 곳과 호출되는 곳이 얼마나 멀리 떨어져 있는가?
- **목표**: props drilling의 흐름과 한계를 체감

## Step 2. useReducer + Context — React 내장 도구로 해결해보기

- useState로 관리하던 Goal, Todo 상태를 useReducer로 전환
- action type을 명확히 정의 (ADD_TODO, TOGGLE_TODO, DELETE_TODO, UPDATE_TODO 등)
- Context API로 state와 dispatch를 하위 컴포넌트에 전달하여 props drilling 제거
- state Context와 dispatch Context 분리하여 불필요한 리렌더링 방지
- **관찰 포인트**
  - Context를 쪼개지 않으면 dispatch만 쓰는 컴포넌트도 state 변경 시 리렌더링됨
  - Provider 중첩이 깊어지는 현상 (Provider Hell)
  - reducer가 커질수록 action type 관리가 번거로워짐
- **목표**: reducer 패턴 익히기 + Context의 가능성과 한계를 동시에 체감

## Step 3. API 통신 — 서버 상태의 복잡성 직면

- json-server로 REST API 구성 (goals, todos 엔드포인트)
- useReducer + Context 기반에서 useEffect + fetch로 CRUD 구현
- 로딩/에러 상태를 reducer에 추가 (FETCH_START, FETCH_SUCCESS, FETCH_ERROR 패턴)
- 낙관적 업데이트(optimistic update) 직접 구현해보기
- **관찰 포인트**
  - fetch 후 Context에 넣기까지의 로딩/에러 처리 보일러플레이트가 매 요청마다 반복됨
  - 데이터 변경(추가/삭제) 후 목록을 다시 fetch할지, 로컬 state만 업데이트할지 판단이 필요
  - 네트워크 에러 후 재시도는? → 직접 구현해야 함
  - 페이지 이동 후 돌아왔을 때 데이터를 다시 fetch해야 하는가? → 캐싱 전략 부재
- **목표**: 서버 상태 관리의 본질적 어려움 체감 (캐싱, 동기화, 중복 제거, 에러 복구)

## Step 4. 전역 상태관리 라이브러리 — 더 나은 도구 경험

- Zustand 도입 (가볍고 직관적, 러닝커브 낮음)
- Context + useReducer를 Zustand store로 전환
- store 내에서 API 요청/응답 처리 (async action)
- selector를 활용한 필요한 상태만 구독 (리렌더링 최적화)
- devtools 연결하여 상태 변화 디버깅
- **관찰 포인트**
  - Context 대비 보일러플레이트가 얼마나 줄었는가?
  - selector로 리렌더링 범위를 제어하는 것과 Context 분리의 차이
  - 서버 상태를 store에서 관리할 때 로딩/에러/캐싱을 매번 직접 처리해야 하는 불편함
  - store가 비대해지는 현상 — 서버 상태와 UI 상태가 뒤섞임
- **목표**: 전역 상태관리의 편리함 체감 + 서버 상태를 store에 넣는 것의 한계 인식

## Step 5. TanStack Query — 서버 상태 전문 도구

- API 통신 로직을 TanStack Query로 전환
- useQuery, useMutation으로 CRUD 재구현
- 캐싱, 자동 리페칭, staleTime/gcTime 설정
- optimistic update를 TanStack Query 방식으로 재구현 (Step 3과 비교)
- Zustand에는 UI 상태만 남기고, 서버 상태는 전부 TanStack Query로 이관
- **관찰 포인트**
  - Step 3에서 직접 구현했던 로딩/에러/캐싱/재시도가 선언적으로 해결됨
  - store에서 서버 상태를 빼니 store가 얼마나 가벼워지는가?
  - queryKey 설계가 캐싱 전략의 핵심임을 이해
- **목표**: 서버 상태 전문 라이브러리의 이점 체감, **상태를 분류하고 적절한 도구에 배치하는 판단력** 확립

---

## 최종 목표

> **"이 상태는 어디에 두는 게 맞는가?"** 라는 질문에 자신 있게 답할 수 있는 것.

- 컴포넌트 로컬로 충분한가? → useState
- 복잡한 상태 전이가 있는가? → useReducer
- 여러 컴포넌트가 공유해야 하는가? → Context 또는 전역 store
- 서버에 원본이 있는 데이터인가? → TanStack Query
- 위 판단을 **상황에 맞게 조합**하는 것이 상태관리의 본질
