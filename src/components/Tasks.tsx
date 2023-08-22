import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import TaskType from "../models/TaskType";
import styles from "./Tasks.module.css";
import { PlusCircle, ClipboardText, Trash } from "phosphor-react";

export function Tasks() {
  const [task, setTask] = useState<TaskType>({
    valueTask: "",
    isFinished: false,
  });
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: crypto.randomUUID(),
      valueTask: "Teste de criação de task",
      isFinished: false,
    },
  ]);

  let totalTasks = tasks.length;

  let totalTaskCompleted = tasks.filter((t) => {
    return t.isFinished;
  }).length;

  function handleChangeValueTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setTask({ valueTask: event.target.value, isFinished: false });
  }

  function handleNewTask(event: FormEvent) {
    event.preventDefault();
    let _newTask = { ...task, id: crypto.randomUUID() };
    setTasks([...tasks, _newTask]);
    setTask({ valueTask: "", isFinished: false });
  }

  function handleDeleteTask(id?: string) {
    let _filter = tasks.filter((t) => {
      return t.id !== id;
    });

    setTasks(_filter);
  }

  function handleSetcheked(event: ChangeEvent<HTMLInputElement>, id?: string) {   
    let newTasks = tasks.map((task) => {
      if (task.id == id) task.isFinished = event.target.checked;
      return task;
    });

    setTasks(newTasks);
  }

  function handleNewTaskInvalid(event:InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }


  return (
    <div className={styles.box}>
      <form className={styles.formContainer} onSubmit={handleNewTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={handleChangeValueTask}
          value={task.valueTask}
          onInvalid={handleNewTaskInvalid}
          required
        />
        <button>
          Criar
          <PlusCircle size={15} weight="bold" />
        </button>
      </form>

      <div className={styles.taskContainer}>
        <div className={styles.summary}>
          <span className={styles.summaryTotal}>
            Tarefas criadas{" "}
            <strong className={styles.summaryValue}>{totalTasks}</strong>
          </span>

          <span className={styles.summaryFinished}>
            Concluídas{" "}
            <strong className={styles.summaryValue}>
              {totalTaskCompleted} {tasks.length > 0 ? `de ${totalTasks}` : ""}{" "}
            </strong>
          </span>
        </div>

        {tasks.length == 0 ? (
          <div className={styles.taskcontent}>
            <ClipboardText size={56} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        ) : (
          <div className={styles.taskcontentEmpty}>
            {tasks.map((t) => {
              return (
                <div
                  className={`${styles.task} ${
                    t.isFinished ? styles.finished : ""
                  } ${styles.newTask}`}
                  key={t.id}
                >
                  <label className={styles.taskCheckbox}>
                    <input
                      type="checkbox"
                      onChange={(e) => handleSetcheked(e, t.id)}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                  <span id="">{t.valueTask}</span>
                  <div className={styles.taskIcon}>
                    <Trash
                      size={16}
                      weight="bold"
                      onClick={() => handleDeleteTask(t.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
