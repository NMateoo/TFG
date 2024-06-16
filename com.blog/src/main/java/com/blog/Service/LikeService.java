package com.blog.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blog.Modelo.Publicacion;
import com.blog.Modelo.PublicacionLike;
import com.blog.Repository.LikeRepository;
import com.blog.Repository.PublicacionRepository;
import com.blog.Usuario.Usuario;
import com.blog.Usuario.UsuarioRespository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final PublicacionRepository publicacionRepository;
    private final UsuarioRespository usuarioRespository;

    public void likePost(Long publicacionId, Long usuarioId) {
        Usuario usuario = usuarioRespository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Publicacion publicacion = publicacionRepository.findById(publicacionId)
                .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));

        Optional<PublicacionLike> likeOpt = likeRepository.findByUsuarioAndPublicacion(usuario, publicacion);
        if (likeOpt.isPresent()) {
            likeRepository.delete(likeOpt.get());
            publicacion.setLikesCount(publicacion.getLikesCount() - 1);
        } else {
            PublicacionLike like = new PublicacionLike();
            like.setUsuario(usuario);
            like.setPublicacion(publicacion);
            likeRepository.save(like);
            publicacion.setLikesCount(publicacion.getLikesCount() + 1);
        }

        publicacionRepository.save(publicacion);
    }
}