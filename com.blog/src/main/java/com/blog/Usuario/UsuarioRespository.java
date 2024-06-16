package com.blog.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRespository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByUsername(String username);
}
