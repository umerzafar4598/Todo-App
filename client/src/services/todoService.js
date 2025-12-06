import api from './api';

export async function fetchTodos() {
    const res = await api.get('/todos');
    return res.data.todos;
}
export async function createTodo({ title, deadline }) {
    const res = await api.post('/todos', { title, deadline });
    return res.data.todo;
}
export async function updateTodo(id, payload) {
    const res = await api.put(`/todos/${id}`, payload);
    return res.data.todo;
}
export async function deleteTodo(id) {
    const res = await api.delete(`/todos/${id}`);
    return res.data;
}