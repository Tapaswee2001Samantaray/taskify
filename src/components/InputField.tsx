import React, { useRef } from 'react';
import "./styles.css";

interface PropsType {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<PropsType> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTodo(e.target.value);
    }

    return (
        <form className="input" onSubmit={(e) => {
            handleAdd(e);
            inputRef.current?.blur();
        }}>
            <input
                ref={inputRef}
                type="input"
                value={todo}
                onChange={handleChange}
                placeholder="enter a task"
                className="input__box"
            />
            <button className="input__submit" type="submit">Go</button>
        </form>
    );
}

export default InputField; 