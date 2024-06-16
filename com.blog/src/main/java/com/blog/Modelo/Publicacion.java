package com.blog.Modelo;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Publicacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_publicacion")
    private long idPublicacion;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "comentario", nullable = false)
    private String comentario;

    @Column(name = "categoria", nullable = false)
    private String categoria;

    @Column(name = "fecha_publicacion", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaPublicacion = LocalDateTime.now();

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "autor", nullable = false)
    private String autor;

    @Column(name = "likes_count")
    private long likesCount;
}