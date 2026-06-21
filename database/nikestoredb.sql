CREATE DATABASE nikestoredb;
USE nikestoredb;

CREATE TABLE users (
    id integer primary key auto_increment,
    nome varchar(255) not null,
    cognome varchar(255) not null,
    password varchar(255) not null,
    p_acquisto varchar(25) not null,
    email varchar (255) not null unique,
    data_nascita date not null,
    telefono char(10),
    paese varchar(50) DEFAULT 'Italia'
);

CREATE TABLE favourites (
    id integer primary key auto_increment,
    user_id integer NOT NULL,
    prodotto_id integer NOT NULL
);