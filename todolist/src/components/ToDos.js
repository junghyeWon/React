import styles from './ToDos.module.css';
import {useEffect, useState} from "react";

function ToDos() {
    const [loading, setLoading] = useState(false);
    const [taskObj, setTaskObj] = useState([]);
    const [indexNum, setIndexNum] = useState(1);
    const [userTask, setUserTask] = useState("");

    const handleInputChange = (e) => setUserTask(e.target.value);

    // 등록
    const handleSubmit = (e) => {
        e.preventDefault();
        if(userTask === "")  return alert("Please Add a new task");

        const newTask = { id: indexNum, text: userTask, check: false };
        const updatedTasks = [...taskObj, newTask];
        setTaskObj(updatedTasks);
        setUserTask("");
        setIndexNum(indexNum + 1);
        localStorage.setItem("localTodos", JSON.stringify(updatedTasks));
    };

    // 삭제
    const handleDelete = (id) => {
        const updatedTasks = taskObj.filter((task) => task.id !== id);
        setTaskObj(updatedTasks);
        localStorage.setItem("localTodos", JSON.stringify(updatedTasks));
    };

    // 수정 및 업데이트
    const handleModify = (e) => {
        const _this = e.target, _parents = _this.parentNode, taskId = Number(_parents.dataset.id);
        const contentElement =_parents.querySelector("div");

        if(_this.localName === "input"){
            // 체크박스 상태 변경 (Done)
            setTaskObj((prevTaskObj) => {
                const updatedTasks = prevTaskObj.map(task =>
                    task.id === taskId ? { ...task, check: e.target.checked } : task
                );
                localStorage.setItem("localTodos", JSON.stringify(updatedTasks)); // 로컬스토리지 업데이트
                return updatedTasks; // 상태 업데이트
            });
        }else{
            // Modify 버튼 클릭
            if (_this.dataset.editing === "true") {
                // 수정 상태 -> 저장
                _this.innerHTML = "Modify";
                const modifiedText = contentElement.querySelector("input").value;
                setTaskObj((prevTaskObj) => {
                    const updatedTasks = prevTaskObj.map(task =>
                        task.id === taskId ? { ...task, text: modifiedText } : task
                    );
                    localStorage.setItem("localTodos", JSON.stringify(updatedTasks)); // 로컬스토리지 업데이트
                    return updatedTasks; // 상태 업데이트
                });
                contentElement.innerHTML = `<p><label for="chk_${taskId}">${modifiedText}</label></p>`;
                _this.innerHTML = "Modify";
                _this.dataset.editing = "false";
            } else {
                // 수정 모드 -> 입력 필드로 변경
                const stateChk = _parents.querySelector("input").checked;
                if(stateChk === true){
                    return alert('Please mark as not done 🤥');
                }else{
                    _this.innerHTML = "Save";
                    _this.dataset.editing = "true";
                    contentElement.innerHTML = `<input type="text" value="${contentElement.querySelector("p").innerText}" />`;
                }

            }
        }
    }
    
    // 전체삭제
    const handleDeleteAll = () => {
        setTaskObj([]);
        localStorage.removeItem("localTodos");
    }

    // 페이지 로딩될때, localStorage 내용 업데이트
    useEffect(() => {
        const getItemTodos = localStorage.getItem("localTodos");
        if(getItemTodos) {
            const parsedTodos = JSON.parse(getItemTodos);
            setTaskObj(parsedTodos);
            setIndexNum(parsedTodos.length > 0 ? parsedTodos[parsedTodos.length - 1].id + 1 : 1);
        }
        setLoading(true);
    }, []);

    return (
        <div>
            {loading ? (
                <div className={styles.todo}>
                    <h2>TO DO LIST</h2>
                    <div className={styles.todo__form}>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>register a new task</legend>
                                <input type="text" placeholder="What do you need to do?" onChange={handleInputChange} value={userTask}/>
                                <button type="submit"><span>Add new task</span></button>
                            </fieldset>
                        </form>
                    </div>
                    <div className={styles.todo__list}>
                        {taskObj.length > 0 ?
                            <ul>
                                {taskObj.map((tasks) => (
                                    <li key={tasks.id} data-id={tasks.id}
                                        className={tasks.check ? styles.todo__done : null}>
                                        <input type="checkbox" name="chk" id={`chk_${tasks.id}`} checked={tasks.check} onChange={handleModify}/>
                                        <div className={styles.todo__user_task}>
                                            <p><label htmlFor={`chk_${tasks.id}`}>{tasks.text}</label></p>
                                        </div>
                                        <button onClick={() => handleDelete(tasks.id)} className={styles.todo__delete_btn}>Delete</button>
                                        <button onClick={handleModify} className={styles.todo__modify_btn}>Modify</button>
                                    </li>
                                ))}
                            </ul>
                            // <p>read the book (at least 5 pages)<br/>buy dog food<br/>call my parents<br/>clean my working place</p>
                            : <strong>No task...</strong>}
                    </div>
                    <button className={styles.todo__delete_btn_all} onClick={handleDeleteAll}>Delete all tasks</button>
                </div>
            ) : null}
        </div>
    );
}

export default ToDos;