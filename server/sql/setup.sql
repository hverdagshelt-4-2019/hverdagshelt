start transaction;
DROP TRIGGER IF EXISTS tickettime;
DROP TRIGGER IF EXISTS ticketfinishtime;
DROP TABLE IF EXISTS happening;
DROP TABLE IF EXISTS happening_category;
DROP TABLE IF EXISTS ticket_comment;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS ticket_category;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS person_CROSS_commune;
DROP TABLE IF EXISTS public_worker;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS commune;

CREATE TABLE commune(
  name VARCHAR(64) PRIMARY KEY
);

CREATE TABLE person(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(254) UNIQUE NOT NULL,
  username VARCHAR(254),
  password VARCHAR(256) NOT NULL
);

CREATE TABLE admin(
  id INT PRIMARY KEY AUTO_INCREMENT,

  FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE person_CROSS_commune(
  person_id INT,
  commune_name VARCHAR(64),

  PRIMARY KEY (person_id, commune_name),
  FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
  FOREIGN KEY (commune_name) REFERENCES commune(name) ON DELETE CASCADE
);

CREATE TABLE public_worker(
  id INT PRIMARY KEY,
  commune_name VARCHAR(64) NOT NULL,

  FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE,
  FOREIGN KEY (commune_name) REFERENCES commune(name)
);

CREATE TABLE company(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(256) NOT NULL,

  FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE ticket_category(
  name VARCHAR(64) PRIMARY KEY
);

CREATE TABLE ticket(
  id INT PRIMARY KEY AUTO_INCREMENT,
  submitter_id INT,
  responsible_commune VARCHAR(64) NOT NULL,
  responsible_company_id INT DEFAULT NULL,
  category VARCHAR(64) NOT NULL,
  title VARCHAR(64) NOT NULL,
  description VARCHAR(512) NOT NULL,
  statusText VARCHAR(512) DEFAULT NULL,
  picture VARCHAR(128) DEFAULT NULL,
  submitted_time DATETIME NOT NULL,
  finished_time DATETIME DEFAULT NULL,
  status ENUM('Ubehandlet', 'Bearbeides', 'Fullført') DEFAULT 'Ubehandlet',
  lat DOUBLE DEFAULT NULL,
  lng DOUBLE DEFAULT NULL,


  FOREIGN KEY (submitter_id) REFERENCES person(id) ON DELETE SET NULL,
  FOREIGN KEY (responsible_commune) REFERENCES commune(name) ON DELETE CASCADE,
  FOREIGN KEY (responsible_company_id) REFERENCES company(id) ON DELETE SET NULL,
  FOREIGN KEY (category) REFERENCES ticket_category(name)
);

CREATE TABLE ticket_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  ticket_id INT NOT NULL,
  description VARCHAR(256) NOT NULL,
  submitter_id INT,

  FOREIGN KEY (submitter_id) REFERENCES person(id) ON DELETE CASCADE,
  FOREIGN KEY (ticket_id) REFERENCES ticket(id) ON DELETE CASCADE
);

CREATE TABLE happening_category(
  name VARCHAR(64) PRIMARY KEY
);

CREATE TABLE happening(
  id INT PRIMARY KEY AUTO_INCREMENT,
  submitter_id INT,
  commune_name VARCHAR(64) NOT NULL,
  category VARCHAR(64) NOT NULL,
  title VARCHAR(128) NOT NULL,
  description VARCHAR(512) NOT NULL,
  picture VARCHAR(128) DEFAULT NULL,
  happening_time DATETIME NOT NULL,

  FOREIGN KEY (submitter_id) REFERENCES person(id) ON DELETE SET NULL,
  FOREIGN KEY (commune_name) REFERENCES commune(name),
  FOREIGN KEY (category) REFERENCES happening_category(name)
);

CREATE TRIGGER tickettime BEFORE INSERT ON ticket
FOR EACH ROW
SET NEW.submitted_time=now();


CREATE TRIGGER ticketfinishtime BEFORE UPDATE ON ticket
    FOR EACH ROW
  BEGIN
    IF NEW.status = 'Fullført' THEN
      SET NEW.finished_time=now();
    END IF;
END;

commit;