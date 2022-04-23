
-- 1 Creacion de Usuarios de la pagina
CREATE TABLE usuarios
(
    id_usuario serial NOT NULL,
    email character varying(50) unique NOT NULL,
    password character varying(100) NOT NULL,
        PRIMARY KEY (id_usuario)
);


-- 2 Creacion de la Cuenta que ocupara el usuario
CREATE TABLE cuenta
(
    id_cuenta serial NOT NULL,
    id_usuario integer unique NOT NULL,
    nombre character varying(50),
    plataforma character varying(10),
    nivel integer,
    rango_br character varying(100),
    rango_ar character varying(100),
    leyenda character varying(50),
    arma character varying(50),
    mapa character varying(50),
        CONSTRAINT id_usuario FOREIGN KEY (id_usuario)
        REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
);


-- 3 Testeo de inserts en las tablas
INSERT INTO public.usuarios(
	email, password)
	VALUES ('holi@apex.cl', 123);

INSERT INTO public.cuenta(
	id_usuario, nombre, plataforma, nivel, rango_br, rango_ar, leyenda, arma, mapa)
	VALUES (1, 'Raminshain', 'PS4', 500, 2830, 2934, 'Seer', 'R-99', 'Kings Canyon');