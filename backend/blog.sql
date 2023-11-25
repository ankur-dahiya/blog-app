CREATE DATABASE blog;
use blog;
CREATE TABLE user(
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(45) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
img VARCHAR(255)
);

ALTER TABLE user RENAME TO users;

CREATE TABLE posts(
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(255) NOT NULL,
`desc` VARCHAR(1000) NOT NULL,
img VARCHAR(255) NOT NULL,
date DATETIME NOT NULL,
uid INT NOT NULL,
FOREIGN KEY(uid) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE);

INSERT INTO users (id,username,email,password) VALUES 
(1,"ankur","ankur@dahiya.com","12345"),
(2,"nikhil","nikhil@dahiya.com","12345");

INSERT INTO users (id,username,email,password,img) VALUES 
(6,"sana","sana@dahiya.com","12345","https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

INSERT INTO posts (id,title,`desc`,img,date,uid) VALUES 
(1,"new title","this is desc","image","2023-11-07 13:02:00",1);
INSERT INTO posts (id,title,`desc`,img,date,uid,cat) VALUES 
(3,"Lorem ipsum dolor sit amet consectetur.","adipisicing elit. Dolor dolore quisquam laudantium similique tenetur laborum ducimus aperiam obcaecati at enim, delectus hic corporis minima!","https://images.unsplash.com/photo-1599906823892-321f8347dfcd?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","2023-11-07 13:02:00",3,"art");

SELECT * FROM posts;
ALTER TABLE posts ADD cat VARCHAR(45);

SELECT `username`,u.`img` AS userImg,`title`,`desc`,p.`img`,`cat`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=1;

UPDATE posts SET uid=3 WHERE id=3;
