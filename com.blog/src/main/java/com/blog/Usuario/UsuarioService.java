package com.blog.Usuario;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRespository usuarioRespository;

    public UsuarioDTO getUser(String username) {
        Usuario usuario= usuarioRespository.findByUsername(username).orElse(null);
       
        if (usuario!=null) {
            UsuarioDTO usuarioDTO = UsuarioDTO.builder()
            .id(usuario.id)
            .username(usuario.username)
            .email(usuario.email)
            .rol(usuario.rol)
            .avatar(usuario.avatar)
            .build();
            return usuarioDTO;
        }
        return null;
    }

    public UsuarioDTO updateUser(String username, UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioRespository.findByUsername(username).orElse(null);
        if (usuario != null) {
            if (usuarioDTO.getEmail() != null) {
                usuario.setEmail(usuarioDTO.getEmail());
            }
            if (usuarioDTO.getAvatar() != null) {
                usuario.setAvatar(usuarioDTO.getAvatar());
            }

            usuarioRespository.save(usuario);

            return UsuarioDTO.builder()
                .id(usuario.getId())
                .username(usuario.getUsername())
                .email(usuario.getEmail())
                .rol(usuario.getRol())
                .avatar(usuario.getAvatar())
                .build();
        }
        return null;
    }
}
