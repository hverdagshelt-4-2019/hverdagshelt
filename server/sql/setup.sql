DROP TABLE IF EXISTS happening;
DROP TABLE IF EXISTS happening_category;
DROP TABLE IF EXISTS ticket_comment;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS ticket_category;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS person_CROSS_commune;
DROP TABLE IF EXISTS private_person;
DROP TABLE IF EXISTS public_worker;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS commune;

CREATE TABLE commune(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE person(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(254) UNIQUE NOT NULL,
  salt VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL
);

CREATE TABLE admin(
  id INT PRIMARY KEY,

  FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE person_CROSS_commune(
  person_id INT,
  commune_id INT,

  PRIMARY KEY (person_id, commune_id),
  FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
  FOREIGN KEY (commune_id) REFERENCES commune(id) ON DELETE CASCADE
);

CREATE TABLE public_worker(
  id INT PRIMARY KEY,
  commune_id INT NOT NULL,

  FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE,
  FOREIGN KEY (commune_id) REFERENCES commune(id)
);

CREATE TABLE company(
  id INT PRIMARY KEY,
  name VARCHAR(256) NOT NULL,

  FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE ticket_category(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64)
);

CREATE TABLE ticket(
  id INT PRIMARY KEY,
  submitter_id INT NOT NULL,
  responsible_commune_id INT NOT NULL,
  responsible_company_id INT DEFAULT NULL,
  category_id INT NOT NULL,
  title VARCHAR(64) NOT NULL,
  description VARCHAR(512) NOT NULL,
  picture VARCHAR(128) DEFAULT NULL,
  submitted_time DATETIME NOT NULL,
  finished_time DATETIME DEFAULT NULL,
  status ENUM('unprocessed', 'in progress', 'done', 'denied') DEFAULT 'unprocessed',
  lat DOUBLE DEFAULT NULL,
  lng DOUBLE DEFAULT NULL,


  FOREIGN KEY (submitter_id) REFERENCES person(id),
  FOREIGN KEY (responsible_commune_id) REFERENCES commune(id),
  FOREIGN KEY (responsible_company_id) REFERENCES company(id),
  FOREIGN KEY (category_id) REFERENCES ticket_category(id)
);

CREATE TABLE ticket_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  ticket_id INT NOT NULL,
  description VARCHAR(256) NOT NULL,
  submitter_id INT NOT NULL,

  FOREIGN KEY (submitter_id) REFERENCES person(id),
  FOREIGN KEY (ticket_id) REFERENCES ticket(id)
);

CREATE TABLE happening_category(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64) NOT NULL
);

CREATE TABLE happening(
  id INT PRIMARY KEY AUTO_INCREMENT,
  submitter_id INT,
  commune_id INT NOT NULL,
  category_id INT NOT NULL,
  title VARCHAR(64) NOT NULL,
  description VARCHAR(512) NOT NULL,
  picture VARCHAR(128) DEFAULT NULL,
  happening_time DATETIME NOT NULL,

  FOREIGN KEY (submitter_id) REFERENCES public_worker(id) ON DELETE SET NULL,
  FOREIGN KEY (commune_id) REFERENCES commune(id),
  FOREIGN KEY (category_id) REFERENCES happening_category(id)
)