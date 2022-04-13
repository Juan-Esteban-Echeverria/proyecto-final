
-- 1 Creacion de Usuarios de la pagina
CREATE TABLE usuarios
(
    id_usuario serial NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
        PRIMARY KEY (id_usuario)
);


-- 2 Creacion de la Cuenta que ocupara el usuario
CREATE TABLE cuenta
(
    id serial NOT NULL,
    id_usuario integer NOT NULL,
    nombre character varying(50),
    plataforma character varying(10),
    nivel integer,
    rango_br integer,
    rango_ar integer,
        CONSTRAINT id_usuario FOREIGN KEY (id_usuario)
        REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
);


-- 3 Testeo de inserts en las tablas
INSERT INTO public.usuarios(
	email, password)
	VALUES ('holi@apex.cl', 123);

INSERT INTO public.cuenta(
	id_usuario, nombre, plataforma, nivel, rango_br, rango_ar)
	VALUES (1, 'Raminshain', 'PS4', 500, 2830, 2934);