package com.blog.Usuario;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200"})
public class UsuarioController {
    private final UsuarioService usuarioService;

    @GetMapping(value = "{username}")
    public ResponseEntity<UsuarioDTO> getUser(@PathVariable String username)
    {
        UsuarioDTO userDTO = usuarioService.getUser(username);
        if (userDTO==null)
        {
           return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping(value = "{username}")
    public ResponseEntity<UsuarioDTO> updateUser(@PathVariable String username, @RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO updatedUser = usuarioService.updateUser(username, usuarioDTO);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }
}
