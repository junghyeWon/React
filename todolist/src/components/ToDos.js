import styles from './ToDos.module.css';
import {useEffect, useState} from "react";

function ToDos() {
    const [loading, setLoading] = useState(false);
    const [taskObj, setTaskObj] = useState([]);
    const [indexNum, setIndexNum] = useState(1);
    const [userTask, setUserTask] = useState("");

    // 초기화 함수
    const init = () => {
        const getItemTodos = localStorage.getItem("localTodos");
        if(getItemTodos) {
            const parsedTodos = JSON.parse(getItemTodos);
            setTaskObj(parsedTodos);
            setIndexNum(parsedTodos.length > 0 ? parsedTodos[parsedTodos.length - 1].id + 1 : 1);
        }
        setLoading(true);
    }
    const changeText = (e) => setUserTask(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();
        const newTask = [...taskObj, { id: indexNum, text: userTask, check: false }];
        setIndexNum(indexNum + 1);
        setTaskObj(newTask);
        setUserTask("");
        localStorage.setItem("localTodos", JSON.stringify(newTask));
    }
    const onDelete = (e) => {
        const _this = Number(e.target.dataset.id);
        setTaskObj((prevTaskObj) => {
            // prevTaskObj 기반으로 새로운 배열을 반환
            const deleteObj = prevTaskObj.filter((item) => item.id !== _this);
            // 로컬 스토리지에 저장
            localStorage.setItem("localTodos", JSON.stringify(deleteObj));
            return deleteObj;
        });
    }
    const onModify = () => {
        console.log("modify");
    }

    // 이벤트 핸들러를 동적으로 반환
    /*function updateTask(arg){
        return function(event){
            if(arg === "onSubmit"){
                onSubmit(event);
            }else if(arg === "onDelete"){
                onDelete(event);
            }else if(arg === "onModify"){
                onModify();
            }else{
                console.log("error");
            }
        }
    }*/
    // 코드 축약 - 함수 객체를 사용해 action 따라 해당 함수 호출을 간결하게 처리
    const updateTask = (action) => (event) => {
        const actions = { onSubmit, onDelete, onModify: () => console.log("modify") };
        actions[action]?.(event);
    };

    // 페이지 로딩될때, localStorage 내용 업데이트
    useEffect(() => {
        init();
    }, []);

    return (
        <div>
            {loading ? (
            <div className={styles.todo}>
                <h2>TO DO LIST</h2>
                <div className={styles.todo__form}>
                    <form onSubmit={updateTask("onSubmit")}>
                        <fieldset>
                            <legend>register a new task</legend>
                            <input type="text" placeholder="What do you need to do?" onChange={changeText} value={userTask} />
                            <button type="submit"><span>Add new task</span></button>
                        </fieldset>
                    </form>
                </div>
                <div className="list_wrap">
                    {/*taskObj.length > 0 ?*/
                    <ul>
                        {taskObj.map((tasks) => (
                            <li key={tasks.id}>
                                <input type="checkbox" name="chk"/>
                                <p>{tasks.text}</p>
                                <button onClick={updateTask("onDelete")} data-id={tasks.id}>Delete</button>
                                <button onClick={updateTask("onModify")}>Modify</button>
                            </li>
                        ))}
                    </ul>
                    // <p>read the book (at least 5 pages)<br/>buy dog food<br/>call my parents<br/>clean my working place</p>
                    /*: <strong>No task</strong>*/}
                </div>
            </div>
            ) : null}
        </div>
    );
}

export default ToDos;