import { useState } from 'react';

export default function TodoItem(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState({
        title: props.title,
        deadline: props.deadline
    });
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditText(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const handleSave = () => {
        if (editText.title.trim() && editText.deadline) {
            props.onEdit(editText.title, editText.deadline);
            setIsEditing(false);
        }
    }

    const handleCancel = () => {
        setEditText({
            title: props.title,
            deadline: props.deadline
        });
        setIsEditing(false);
    }
    return (

        <div className="todo-item" data-aos="fade-right">
            <div className="todo-left">
                <div className="checkbox" onClick={props.onToggle} >
                    {props.done ? '✓' : ''}
                </div>
                {isEditing ? (
                    <input
                        type="text"
                        name="title"
                        value={editText.title}
                        onChange={handleEditChange}
                        className="edit-input-title"
                    />
                ) : (<div>
                    <div className="todo-title" style={{ textDecoration: props.done ? 'line-through' : 'none' }}> {props.title}</div>
                    <div style={{ fontSize: "12px", opacity: 0.7 }}>
                        Created: {new Date(props.createdAt).toLocaleString()}
                    </div>
                    <div style={{ fontSize: "12px", opacity: 0.7 }}>
                        Updated: {new Date(props.updatedAt).toLocaleString()}
                    </div>
                </div>
                )}
            </div>
            <div className="task-deadline">
                {isEditing ? (
                    <input
                        type="date"
                        name="deadline"
                        value={editText.deadline}
                        onChange={handleEditChange}
                        className="edit-input-deadline"
                    />
                ) : (
                    <span> {props.deadline} </span>
                )}
            </div>
            {isEditing ? (
                <div className="action-btn">
                    <button className="btn-save" onClick={handleSave}>Save</button>
                    <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div className="action-btn">
                    <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="btn-delete" onClick={props.onDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}