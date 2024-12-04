import styles from './ToDos.module.css';
import {useEffect, useState} from "react";

function ToDos() {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [userTask, setUserTask] = useState("");
    const [completedCount, setCompletedCount] = useState(0);
    const progress = Math.round((completedCount/tasks.length)*100);

    const handleInputChange = (e) => setUserTask(e.target.value);

    // 등록
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!userTask) return alert("Please Add a new task"); // 공백일 경우
        const newTask = { id: Date.now(), text: userTask, check: false, editing: true }; // default
        updateLocalStorage([...tasks, newTask]);
        setUserTask("");
    };

    // 삭제
    const handleDelete = (id) => {
        updateLocalStorage(tasks.filter((task) =>
            task.id !== id
        )); // id 매칭 외 항목 재송출
    };

    // 수정 및 업데이트
    const handleModify = (task, id, editing) => {
        // 작업완료 상태에서는 수정불가
        if (!editing) return alert('Please mark as not done 🤥');

        // 선택된 항목의 부모요소
        const parentElement = document.querySelector(`[data-id='${id}']`);
        const textElement = parentElement.querySelector('p');
        const btnElement = parentElement.querySelector('button');

        toggleEditMode(textElement, task, id, btnElement);
    }

    // 텍스트 수정 모드를 토글하는 함수
    const toggleEditMode = (textElement, task, taskId, btnElement) => {
        if (textElement && textElement.querySelector('input')) {
            const inputElement = textElement.querySelector('input');
            textElement.innerHTML = `<label for="chk_${taskId}">${inputElement.value}</label>`;
            btnElement.innerText = `Modify`;

            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, text: inputElement.value } : task
            );
            updateLocalStorage(updatedTasks);
        } else {
            textElement.innerHTML = `<input type="text" value=${task.text} />`;
            btnElement.innerText = `Save`;
        }
    };

    // 작업완료 구분
    const handleToggleCheck = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, check: !task.check, editing: !task.editing } : task
        );
        updateLocalStorage(updatedTasks);
    };

    // 로컬스토리지 업데이트
    const updateLocalStorage = (updatedTasks) => {
        setTasks(updatedTasks);
        localStorage.setItem("localTodos", JSON.stringify(updatedTasks));
        setCompletedCount(updatedTasks.filter(task => task.check).length);
    };

    // 전체삭제
    const handleDeleteAll = () => {
        setTasks([]);
        localStorage.removeItem("localTodos");
        setCompletedCount(0);
    }

    // 페이지 로딩될때, localStorage 내용 업데이트
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("localTodos")) || [];
        setTasks(storedTasks);
        setCompletedCount(storedTasks.filter(task => task.check).length);
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
                            <input type="text" placeholder="What do you need to do?" onChange={handleInputChange} value={userTask} />
                            <button type="submit"><span>Add new task</span></button>
                        </fieldset>
                    </form>
                </div>
                <div className={styles.todo__list}>
                    {tasks.length > 0 ?
                    <ul>
                        {tasks.map((tasks) => (
                            <li key={tasks.id} data-id={tasks.id} className={tasks.check ? styles.todo__done : null}>
                                <input type="checkbox" name="chk" id={`chk_${tasks.id}`} checked={tasks.check} onChange={() => handleToggleCheck(tasks.id)}/>
                                <div className={styles.todo__user_task}>
                                    <p><label htmlFor={`chk_${tasks.id}`}>{tasks.text}</label></p>
                                </div>
                                <button onClick={() => handleModify(tasks, tasks.id, tasks.editing)} className={styles.todo__modify_btn}>Modify</button>
                                <button onClick={() => handleDelete(tasks.id)} className={styles.todo__delete_btn}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    : <strong>No task...</strong>}
                </div>
                {tasks.length > 0 ?
                <div className={styles.todo__info}>
                    <p className={styles.todo__progress}>
                        <strong>{completedCount}</strong> of <strong>{tasks.length}</strong> tasks done
                        <span style={{width:progress+"%", backgroundColor:"mediumaquamarine"}}></span>
                    </p>
                    <button className={styles.todo__delete_btn_all} onClick={handleDeleteAll}>Delete all tasks</button>
                </div>
                : null}
            </div>
            ) : null}
        </div>
    );
}

export default ToDos;