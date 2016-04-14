package todo.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import todo.model.Todo;
import todo.model.User;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long>{
	
	public List<Todo> findAllByUser(User user);
	public Todo findOne(Long id);
	public Todo save(Todo todo);
	public void delete(Long id);

}
