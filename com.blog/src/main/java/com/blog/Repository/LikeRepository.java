package com.blog.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.Modelo.Publicacion;
import com.blog.Modelo.PublicacionLike;
import com.blog.Usuario.Usuario;

@Repository
public interface LikeRepository extends JpaRepository<PublicacionLike, Long> {
    Optional<PublicacionLike> findByUsuarioAndPublicacion(Usuario usuario, Publicacion publicacion);
}
