package org.somik.todo.resources;

import java.util.List;

import org.somik.todo.api.Todo;
import org.somik.todo.dao.TodoDAO;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/todo")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TodoResource {
	TodoDAO todoDao;
	
	public TodoResource(TodoDAO todo) {
		this.todoDao = todo;
	}
	
	@POST
	public void addTodo(Todo todo) {
		todoDao.insertTodo(todo.getName(), todo.getDescription(), todo.getDate());
	}
	
	@PUT
	@Path("/{id}")
	public void updateTodo(@PathParam("id") int id, Todo todo) {
		todoDao.updateTodo(id, todo.getName(), todo.getDescription(), todo.getDate());
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteTodo(@PathParam("id") int id) {
		todoDao.deleteTodo(id);
	}
	
	@GET
	public List<Todo> getAll() {
		return todoDao.findAll();
	}
	
	@GET
	@Path("/{id}")
	public Todo getById(@PathParam("id") int id) {
		return todoDao.findById(id);
	}
	
	@GET
	@Path("/install")
	public void initialize() {
		todoDao.createTodoTable();
	}
}