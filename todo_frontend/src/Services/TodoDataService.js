import axios from "axios"

// Url for backend API
const API_BASE_URL = "http://130.61.228.199:8080/todo";

class TodoDataService{
    async createTodo(todo){
        return await axios.post(API_BASE_URL, todo);
    }
    async getTodo(){
        return await axios.get(API_BASE_URL);
    }
    async getTodoById(id){
        return await axios.get(API_BASE_URL + "/" + id);
    }
    async updateTodoById(id,todo){
        return await axios.put(API_BASE_URL + "/" + id, todo);
    }
    async completeTodoById(id,check){
        return await axios.get(API_BASE_URL + "/" + id + "/" + check);
    }
    async deleteTodo(id){
        return await axios.delete(API_BASE_URL + "/" + id);
    }
}

export default new TodoDataService();
