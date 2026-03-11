import { TbCards } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";
import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList, { type Todo } from "./TodoList";

interface TodoSectionProps {
  id: string;
  color: string;
  name: string;
}

const TodoSection = ({ id, color, name }: TodoSectionProps) => {
  const [show, setShow] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleToggleTodo = (selectedTodo: Todo) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.todoId !== selectedTodo.todoId) return todo;
        return { ...todo, isCompleted: !todo.isCompleted };
      }),
    );
  };

  const handleAddTodo = (content: string) => {
    setTodoList([
      ...todoList,
      {
        todoId: Math.floor(Math.random() * 100000),
        content,
        isCompleted: false,
      },
    ]);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <GoalArea>
        <TbCards style={{ fontSize: "18px" }} />
        <GoalName $color={color}>{name}</GoalName>
        <AddBtn onClick={handleShow}>
          <MdAdd id="addBtn" />
        </AddBtn>
      </GoalArea>
      {/* goal list가 들어가야함. */}
      <TodoList todos={todoList} color={color} onToggle={handleToggleTodo} />
      <TodoInput
        goalId={id}
        show={show}
        color={color}
        onClose={() => setShow(false)}
        onAdd={handleAddTodo}
      />
    </>
  );
};

const GoalArea = styled.div`
  background-color: #f2f2f2;
  padding: 8px 13px;
  width: fit-content;
  border-radius: 30px;
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
`;

const GoalName = styled.div<{ $color: string }>`
  font-weight: bold;
  font-size: 15px;
  color: ${(props) => props.$color};
`;
const AddBtn = styled.div`
  background-color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default TodoSection;
