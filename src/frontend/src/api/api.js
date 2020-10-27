import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import useAxios, {configure} from "axios-hooks";

const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 1000,
});
configure({axios: api})

// ========== Remove this! =============
let todos = []
const mock = new MockAdapter(api, { delayResponse: 100 });

mock.onGet("/todos").reply(() => {
    return [200, todos]
});

mock.onPost("/todos").reply(config => {
    const todo = {
        ...JSON.parse(config.data),
        id: todos.length,
    }

    todos = [ todo, ...todos ]
    return [200, todo]
})

mock.onDelete(/\/todos\/\d+/).reply(config => {
    todos = todos.filter(todo => todo.id !== config.id)
    return [204, {}]
})

mock.onPut('/todos').reply(config => {
    const updatedTodo = JSON.parse(config.data)

    todos = todos.map(todo => {
        if (todo.id === updatedTodo.id) {
            return JSON.parse(config.data)
        }
        return todo
    })
    return [204, {}]
})
// ========== End of Remove this! =============

// Hooks
export const useTodos = () => useAxios("/todos")
export const addTodo = (todo) => api.post("/todos", todo)
export const deleteTodo = (todo) => api.delete(`/todos/${todo.id}`, todo)
export const updateTodo = (todo) => api.put(`/todos`, todo)