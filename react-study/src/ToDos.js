import {useState} from "react";

function ToDos() {
    const [toDo, setTodo] = useState("");
    const [toDos, setTodos] = useState([]);
    const onChangeValue = (event) => setTodo(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
        // console.log(toDo);
        if (toDo === ""){
            return;
        }
        // Const ToDos 이기때문에 toDos.push 또는 ToDo = '' 와 같이 직접값을 줄수없고 함수로 값을 전달해야 함
        // const food = [1,2,3]; 4를 추가하고싶은 경우, const a = [5, ...food]; → [5,1,2,3]; 같은 라인에 복사
        setTodos(currentArray => [toDo, ...currentArray]);
        setTodo("");
    }
    // console.log(toDos);
    return (
        <div className="guide_wrap">
            <h1>My To Dos ({toDos.length})</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Write your to do..." value={toDo} onChange={onChangeValue} />&nbsp;
                <button>Add To Do</button>
            </form>
        </div>
    );
}

export default ToDos;