import { type FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface TodoInputProps {
  goalId: string;
  show: boolean;
  color: string;
  onClose: () => void;
  onAdd: (content: string) => void;
}

const TodoInput = ({ goalId, show, color, onClose, onAdd }: TodoInputProps) => {
  const ref = useRef<HTMLFormElement>(null);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        (e.target as HTMLElement).id !== "addBtn"
      ) {
        onClose();
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!todo.trim()) return;
    onAdd(todo);
    setTodo("");
  };

  return (
    <>
      {show && (
        <form
          ref={ref}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-end",
          }}
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            placeholder="할 일 입력"
            $color={color}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Btn>추가</Btn>
        </form>
      )}
    </>
  );
};

const Input = styled.input<{ $color: string }>`
  margin-top: 20px;
  border: none;
  border-bottom: 2px solid ${(props) => props.$color};
  width: 50%;
  font-size: 14px;
  padding-bottom: 5px;
  &:focus {
    outline: none;
  }
`;

const Btn = styled.button`
  background-color: #f2f2f2;
  border: none;
  padding: 8px;
  font-weight: bold;
  font-size: 11px;
  border-radius: 10px;
  cursor: pointer;
`;

export default TodoInput;
