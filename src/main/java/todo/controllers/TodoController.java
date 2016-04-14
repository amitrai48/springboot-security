package todo.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import todo.dto.TodoDTO;
import todo.model.Todo;
import todo.model.User;
import todo.repositories.TodoRepository;
import todo.repositories.UserRepository;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

		@Autowired
		private TodoRepository todoRepository;
		
		@Autowired
		private UserRepository userRepository;
		
		@RequestMapping(method = RequestMethod.GET)
		public List<TodoDTO>getAllTodos(){
			Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String username;
			if(principal instanceof UserDetails){
				username = ((UserDetails)principal).getUsername();
			}
			else{
				username = principal.toString();
			}
			User user = userRepository.findByUsername(username);
			List<Todo> todos = todoRepository.findAllByUser(user);
			List<TodoDTO> listTodoDTO = new TodoDTO().convertList(todos);
			return listTodoDTO;
		}
		
		@RequestMapping(method = RequestMethod.POST)
		public TodoDTO createTodo(@Valid @RequestBody Todo todo){
			Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String username;
			if(principal instanceof UserDetails){
				username = ((UserDetails)principal).getUsername();
			}
			else{
				username = principal.toString();
			}
			User user = userRepository.findByUsername(username);
			todo.setUser(user);
			todo = todoRepository.save(todo);
			TodoDTO todoDTO = new TodoDTO(todo);
			return todoDTO;
		}
		
		@RequestMapping(value="{id}", method = RequestMethod.GET)
		public ResponseEntity<TodoDTO> findOne(@PathVariable("id") Long id){
			Todo todo = todoRepository.findOne(id);
			if(todo == null){
				return new ResponseEntity<TodoDTO>(HttpStatus.NOT_FOUND);
			}
			TodoDTO todoDTO = new TodoDTO(todo);
			return new ResponseEntity<TodoDTO>(todoDTO,HttpStatus.OK);
		}
		
		@RequestMapping(value="{id}", method = RequestMethod.PUT)
		public ResponseEntity<TodoDTO> updateTodo(@Valid @RequestBody Todo todo, @PathVariable("id") Long id){
			Todo todoDb = todoRepository.findOne(id);
			if(todoDb == null){
				return new ResponseEntity<TodoDTO>(HttpStatus.NOT_FOUND);
			}
			else{
				todoDb.setTitle(todo.getTitle());
				todoDb.setCompleted(todo.getCompleted());
				todoDb = todoRepository.save(todoDb);
				TodoDTO todoDTO = new TodoDTO(todoDb);
				return new ResponseEntity<TodoDTO>(todoDTO,HttpStatus.OK);
			}
		}
		
		@RequestMapping(value="{id}", method = RequestMethod.DELETE)
		public void deleteTodo(@PathVariable("id") Long id) {
			todoRepository.delete(id);
		}
}
