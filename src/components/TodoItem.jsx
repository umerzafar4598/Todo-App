export default function TodoItem(props) {
  return (
    <div
      className={`all-todos ${props.done ? "task-done" : "task-enter"}`}
    >
      <ul>
        <li className="item">
          <div className="info">
            <h3 className={props.done ? "line-through" : ""}>
              {props.title}
            </h3>
            <p>Deadline: {props.deadline}</p>
          </div>

          <button
            className="done"
            onClick={() => props.onMarkDone(props.id)}
          >
            {props.done ? "Undo" : "Done ✓"}
          </button>

          <button
            className="delete"
            onClick={() => props.onDelete(props.id)}
          >
            Delete ✕
          </button>
        </li>
      </ul>
    </div>
  );
}
