create table if not exists users (
  fio int not null,
  login text primary key,  
  password text not null
);

insert or replace into users (fio, login , password) values (
  "Admin Adminovich Adminov",
  "admin",
  "$2a$10$JtuMghJNiDBVnvEAo0gHbOW/dXF3R./2Go6Kmijsl5Zog8PRCr6ZG"
);

create table if not exists clients(
  nomer_scheta int primary key,
  familiya text not null,
  imya text not null,
  otchestvo text not null,
  dateofbirth DATETIME not null,
  inn int not null,
  fio_responsible text not null,
  status int not null DEFAULT 0
);

insert or replace into clients(nomer_scheta, familiya, imya, otchestvo, dateofbirth,inn,fio_responsible, status) values(
  01,
  "test imya",
  "test familia",
  "test otchestvo",
  "2000-16-02 12:12:12",
  "111122223333",
  "Admin Adminovich Adminov",
  0
);

insert or replace into clients(nomer_scheta, familiya, imya, otchestvo, dateofbirth,inn,fio_responsible, status) values(
  02,
  "test imya2",
  "test familia2",
  "test otchestvo2",
  "2001-16-02 12:12:12",
  "111122223334",
  "Arkadiy Arkadievich Arkadiev",
  0
);

insert or replace into clients(nomer_scheta, familiya, imya, otchestvo, dateofbirth,inn,fio_responsible, status) values(
  03,
  "Корона",
  "Вирус",
  "Опасен",
  "2020-16-02 12:12:12",
  "111122225555",
  "Admin Adminovich Adminov",
  0
);

create table if not exists tokens (
  user REFERENCES users (login), 
  refreshToken text not null
);




