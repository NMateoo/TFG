package com.blog.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class UsuarioDTO {
    long id;
    String username;
    String email;
    Rol rol;
    String avatar;
}
