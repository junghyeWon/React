import styles from './ToDos.module.css';
import {useEffect, useRef, useState} from "react";

function ToDos() {
    const indexNum = useRef(1);
    const [taskObj, setTaskObj] = useState([]);
    const [userTask, setUserTask] = useState("");

    const changeText = (event) => setUserTask(event.target.value);
    const onSubmitTask = (event) => {
        event.preventDefault();

        const newTask = [...taskObj];
        newTask.push({
            id:indexNum.current,
            text:userTask,
            check:false
        });

        indexNum.current++;

        setTaskObj(newTask);
        setUserTask("");
    }

    const deleteBtn = (event) => {
        const _this = Number(event.target.dataset.id);
        const updateObj = taskObj.filter((item) => item.id !== _this);
        setTaskObj(updateObj);
    }

    useEffect(() => {
        console.log(taskObj);
    }, [taskObj])

    return (
        <div className={styles.todo}>
            <h2>TO DO LIST</h2>
            <div className={styles.todo__form}>
                <form onSubmit={onSubmitTask}>
                    <fieldset>
                        <legend>register a new task</legend>
                        <input type="text" placeholder="What do you need to do?" onChange={changeText} value={userTask} />
                        <button type="submit"><span>Add new task</span></button>
                    </fieldset>
                </form>
            </div>
            <div className="list_wrap">
                {taskObj.length <= 0 ? <strong>No task</strong> :
                    <ul>
                        {taskObj.map((tasks) => (
                            <li key={tasks.id}>
                                <p>{tasks.text}</p>
                                <button onClick={deleteBtn} data-id={tasks.id}>Delete</button>
                            </li>
                        ))}
                        {/*read the book (at least 5 pages)
                        buy dog food
                        call my parents
                        clean my working place*/}
                    </ul>
                }
            </div>
        </div>
    );
}

export default ToDos;