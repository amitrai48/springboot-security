package todo.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import todo.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{
	public User findOne(Long id);
	public User save(User user);
	@Query("select u from User u where u.username = ?1")
	public User findByUsername(String username);

}
