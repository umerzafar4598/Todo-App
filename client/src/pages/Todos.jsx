import { useState, useEffect, useReducer } from "react"
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../services/todoService";
import TodoItem from "../components/TodoItem";

const ACTIONS = {
    fetch: 'fetch-all-todo',
    add: 'add-todo',
    toggle: 'toggle-todo',
    edit: 'edit-todo',
    delete: 'delete-todo'
}

const reducer = (alltodos, action) => {
    switch (action.type) {
        case ACTIONS.fetch:
        case ACTIONS.add:
        case ACTIONS.toggle:
        case ACTIONS.edit:
        case ACTIONS.delete:
            return action.payload
        default:
            return alltodos;
    }
}

export default function Todos() {
    const [alltodos, dispatch] = useReducer(reducer, []);
    console.log(alltodos);
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState({
        title: "",
        deadline: ""
    });

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await fetchTodos();
                if (mounted) dispatch({ type: ACTIONS.fetch, payload: sortTodos(data) });
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; }
    }, []);

    const sortTodos = (todoList) => {
        return [...todoList].sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            if (!a.completed && !b.completed) {
                return new Date(a.deadline) - new Date(b.deadline);
            }

            return new Date(a.deadline) - new Date(b.deadline);
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputText((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const onAdd = async (e) => {
        e.preventDefault();
        if (!inputText.title || !inputText.deadline) return;
        try {
            const newTodo = await createTodo(inputText);
            dispatch({ type: ACTIONS.add, payload: sortTodos([newTodo, ...alltodos]) });
            setInputText({
                title: "",
                deadline: ""
            })
        } catch (err) {
            console.error(err);
        }
    }

    const toggle = async (t) => {
        try {
            const updated = await updateTodo(t.id, { completed: !t.completed });
            const replace = alltodos.map(p => p.id === updated.id ? updated : p)
            dispatch({ type: ACTIONS.toggle, payload: sortTodos(replace) });
        } catch (err) {
            console.error(err)
        }
    }

    const edit = async (id, newTitle, newDeadline) => {
        try {
            const updated = await updateTodo(id, { title: newTitle, deadline: newDeadline });
            const changed = alltodos.map(p => p.id === updated.id ? updated : p);
            dispatch({ type: ACTIONS.edit, payload: sortTodos(changed) });
        } catch (err) {
            console.error(err)
        }
    }

    const remove = async (id) => {
        try {
            await deleteTodo(id);
            const newAllTodos = alltodos.filter(p => p.id !== id);
            dispatch({ type: ACTIONS.delete, payload: sortTodos(newAllTodos) });
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return <></>

    return (
        <div className="todo-card" data-aos-delay="300" data-aos="zoom-in">
            <form className="input-area" onSubmit={onAdd}>
                <div className="input-form-row">
                    <input
                        className="input-task"
                        type="text"
                        placeholder="Add new tasks"
                        onChange={handleChange}
                        name="title"
                        value={inputText.title}
                        required
                    />
                    <label className="deadline" htmlFor="deadline">
                        <span>Set Deadline</span>
                        <input
                            type="date"
                            id="deadline"
                            onChange={handleChange}
                            name="deadline"
                            value={inputText.deadline}
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="btn-add">Add</button>
            </form>
            {alltodos.length === 0 ? (
                <div className="empty">No tasks yet — Feel free to add new tasks ✨</div>
            ) : (
                <div className="todo-list">
                    {alltodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            done={todo.completed}
                            createdAt={todo.created_at}
                            updatedAt={todo.updated_at}
                            deadline={todo.deadline}
                            onToggle={() => toggle(todo)}
                            onEdit={(title, deadline) => edit(todo.id, title, deadline)}
                            onDelete={() => remove(todo.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}