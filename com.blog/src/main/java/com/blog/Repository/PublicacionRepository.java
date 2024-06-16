package com.blog.Repository;

import com.blog.Modelo.Publicacion;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long>{
    List<Publicacion> findByAutor(String autor);
    List<Publicacion> findByCategoria(String categoria, Sort sort);
}
