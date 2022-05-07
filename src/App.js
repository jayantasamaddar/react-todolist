import { useReducer, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const taskReducers = (state, { type, payload }) => {
  switch (type) {
    case 'onChange':
      return {
        ...state,
        currentTask: { ...state.currentTask, title: payload },
      };

    case 'addTask':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { ...state.currentTask, id: uuidv4(), status: 'open' },
        ],
        totalTasks: state.totalTasks + 1,
        currentTask: { title: '' },
      };
    case 'deleteTask':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== payload),
        totalTasks: state.totalTasks - 1,
      };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  totalTasks: 0,
  currentTask: {},
};

export default function App() {
  const taskRef = useRef();
  const [tasks, dispatch] = useReducer(taskReducers, initialState);

  console.log({ tasks });

  // const addTask = () => dispatch({ type: 'onClick' })

  return (
    <div className="App">
      <h1 className="AppTitle">Task App</h1>
      <div className="inputArea">
        <input
          type="text"
          name="task"
          value={tasks.currentTask.title}
          placeholder="Add a Task"
          onChange={e =>
            dispatch({ type: 'onChange', payload: e.target.value })
          }
        />
        <button
          className="CTABtn"
          onClick={() => dispatch({ type: 'addTask' })}
        >
          Add Task
        </button>
      </div>
      {tasks.tasks.length > 0 && (
        <div className="tasksArea">
          <h3>List of Tasks</h3>
          {tasks.tasks.map((task, indx) => {
            return (
              <div
                className="task"
                key={task.id}
                data-id={task.id}
                ref={taskRef}
              >
                <div className="taskTitle">{task.title}</div>
                <div className="taskActions">
                  <button classname="Edit">Edit</button>
                  <button
                    classname="Delete"
                    onClick={() =>
                      dispatch({ type: 'deleteTask', payload: task.id })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
