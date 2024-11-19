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
        const newTask = { id: Date.now(), text: userTask, check: false, editing: false }; // default
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
    const handleModify = (e, id, editing) => {
        console.log(e);
        console.log(id, editing);

        /*if(!editing){
            const updatedTasks = tasks.map(task =>
                task.id === id ? { ...task, text: modifiedText } : task
            );
            updateLocalStorage(updatedTasks);
        }*/
        // console.log(id)
        /*const taskId = Number(e.target.closest('li').dataset.id);
        const isEditing = e.target.dataset.editing === "true";
        const contentElement = e.target.closest('li').querySelector("div");

        if (!contentElement) {
            console.error("Content element not found");
            return;
        }

        if (isEditing) {
            const modifiedText = contentElement.querySelector("input").value;
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, text: modifiedText } : task
            );
            updateLocalStorage(updatedTasks);
            e.target.innerHTML = "Modify";
            // e.target.dataset.editing = "false";
            contentElement.innerHTML = `<p><label for="chk_${taskId}">${modifiedText}</label></p>`;
        } else {
            const isChecked = e.target.parentNode.querySelector('input[type="checkbox"]').checked;
            if(isChecked) {
                return alert('Please mark as not done 🤥'); // checked 된 상태에서 수정불가
            }

            e.target.innerHTML = "Save";
            // e.target.dataset.editing = "true";
            const taskText = contentElement.querySelector("p") ? contentElement.querySelector("p").innerText : '';
            contentElement.innerHTML = `<input type="text" value="${taskText}" />`;
        }*/
    }

    // 작업완료 구분
    const handleToggleCheck = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, check: !task.check } : task
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