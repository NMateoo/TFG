package com.blog.Controller;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.blog.Jwt.JwtService;
import com.blog.Modelo.Publicacion;
import com.blog.Repository.PublicacionRepository;
import com.blog.Service.LikeService;
import com.blog.Usuario.Usuario;
import com.blog.Usuario.UsuarioRespository;

@RestController
@RequestMapping("/publicaciones")
@CrossOrigin(origins = "http://localhost:4200")
public class PublicacionController {

    private final PublicacionRepository publicacionRepository;
    private final JwtService jwtService;
    private final LikeService likeService;
    private UsuarioRespository usuarioRespository;

    @Autowired
    public PublicacionController(PublicacionRepository publicacionRepository, JwtService jwtService,
            LikeService likeService,
            UsuarioRespository usuarioRespository) {
        this.publicacionRepository = publicacionRepository;
        this.jwtService = jwtService;
        this.likeService = likeService;
        this.usuarioRespository = usuarioRespository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Publicacion>> getAll() {
        Sort sortByFechaPublicacionDesc = Sort.by("fechaPublicacion").descending();
        return buildResponseOfAList(publicacionRepository.findAll(sortByFechaPublicacionDesc));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publicacion> getById(@PathVariable Long id) {
        return ResponseEntity.of(publicacionRepository.findById(id));
    }

    @GetMapping("/autor/{autor}")
    public ResponseEntity<List<Publicacion>> getMisPublicaciones(@RequestHeader("Authorization") String token) {
        String autor = obtenerUsuarioAutenticado(token);
        return buildResponseOfAList(publicacionRepository.findByAutor(autor));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Publicacion>> getByCategoria(@PathVariable String categoria) {
        Sort sortByFechaPublicacionDesc = Sort.by("fechaPublicacion").descending();
        List<Publicacion> publicaciones = publicacionRepository.findByCategoria(categoria, sortByFechaPublicacionDesc);
        return buildResponseOfAList(publicaciones);
    }

    private ResponseEntity<List<Publicacion>> buildResponseOfAList(List<Publicacion> list) {
        if (list.isEmpty())
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(list);
    }

    @PostMapping("/")
    public ResponseEntity<Publicacion> newPublicacion(@RequestBody Publicacion publicacion,
            @RequestHeader("Authorization") String token) {
        String autor = obtenerUsuarioAutenticado(token);

        publicacion.setAutor(autor);
        publicacion.setFechaPublicacion(LocalDateTime.now());
        Publicacion creada = publicacionRepository.save(publicacion);

        URI createdURI = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(creada.getIdPublicacion()).toUri();

        return ResponseEntity
                .created(createdURI)
                .body(creada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Publicacion> edit(@PathVariable Long id, @RequestBody Publicacion edited) {
        return ResponseEntity.of(
                publicacionRepository.findById(id)
                        .map(publi -> {
                            publi.setTitulo(edited.getTitulo());
                            publi.setComentario(edited.getComentario());
                            publi.setImagen(edited.getImagen());
                            publi.setLikesCount(edited.getLikesCount());
                            return publicacionRepository.save(publi);
                        }));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        publicacionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private String obtenerUsuarioAutenticado(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            return jwtService.getUsernameFromToken(token);
        }
        return "anónimo";
    }
}