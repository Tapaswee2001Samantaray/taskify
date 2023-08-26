import React, { useState, useRef, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from '../model';
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

interface PropType {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<PropType> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleEdit = () => {
        if (!edit && !todo.isDone) {
            setEdit(!edit);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTodo(e.target.value)
    }

    const handleSave = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => (todo.id === id) ? { ...todo, todo: editTodo } : todo));
        setEdit(false);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                    onSubmit={(e) => handleSave(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {edit ? (
                        <input
                            value={editTodo}
                            ref={inputRef}
                            onChange={handleChange}
                            className="todos__single--text"
                        />
                    ) : (
                        todo.isDone ? (
                            <s className="todos__single--text">{todo.todo}</s>
                        ) : (
                            <span className="todos__single--text">{todo.todo}</span>
                        )
                    )}
                    <div>
                        <span className="icon">
                            <AiFillEdit onClick={() => handleEdit()} />
                        </span>
                        <span className="icon">
                            <AiFillDelete onClick={() => handleDelete(todo.id)} />
                        </span>
                        <span className="icon">
                            <MdDone onClick={() => handleDone(todo.id)} />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
}

export default SingleTodo;