
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
	VALUES ('holi@apex.cl', "$2a$10$pgVyMmpsVha/2pNgQ1rk0.kNTL9eQBZB92PtC9BwO4Bl.maUX3Im.");

INSERT INTO public.cuenta(
	id_usuario, nombre, plataforma, nivel, rango_br, rango_ar, leyenda, arma, mapa)
	VALUES (1, 'Raminshain', 'PS4', 500, "https://api.mozambiquehe.re/assets/ranks/gold4.png", "https://api.mozambiquehe.re/assets/ranks/silver1.png", 'seer', 'R99', 'KingsCanyon');