
CREATE SCHEMA registro;
USE registro;

  CREATE TABLE usuarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(500) NOT NULL,
    contrasenia VARCHAR(500) NOT NULL,
    fecha DATE NOT NULL,
    dni INT NOT NULL,
    foto_de_perfil TEXT NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    
  );
  
  CREATE TABLE productos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT UNSIGNED NOT NULL,
    nombre_producto VARCHAR(500) NOT NULL,
    descripcion_producto VARCHAR(500) NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    
  );
  
  CREATE TABLE comentarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	id_producto INT UNSIGNED NOT NULL,
    id_usuario INT UNSIGNED NOT NULL,
    texto VARCHAR(500) NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
  );
  
  
  INSERT INTO usuarios  
  VALUES (1, 'martin@gmail.com', 'contra123', '2001-05-26', 43757556, 'img/martin.jpeg',DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO usuarios 
  VALUES (2, 'jesus@gmail.com', 'contra123', '2001-05-26', 43757556, 'img/martin.jpeg',DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO usuarios 
  VALUES (3, 'carlos@gmail.com', 'contra123', '2001-05-26', 43757556, 'img/martin.jpeg',DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO usuarios 
  VALUES (4, 'tomas@gmail.com', 'contra123', '2001-05-26', 43757556, 'img/martin.jpeg',DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO usuarios 
  VALUES (5, 'milton@gmail.com', 'contra123', '2001-05-26', 43757556, 'img/martin.jpeg',DEFAULT, DEFAULT, DEFAULT);
  
  
  
  
  
  
  INSERT INTO productos
  VALUES (1, 1, 'ROLEX GMT-MASTER II','Root Beer de 40mm 2024', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO productos
  VALUES (2, 2, 'ROLEX YACHT-MASTER','Yacht-Master Perpetual Date 40mm 2023', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO productos
  VALUES (3, 3, 'ROLEX DAYTONA','Oyster Perpetual Cosmograph de 40mm 2021', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO productos
  VALUES (4, 4, 'ROLEX CARLOS','Day Date Oyster Perpetual de 40mm 2021', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO productos
  VALUES (5, 5, 'ROLEX GMT-MASTER II','Root Beer de 40mm 2024', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO productos
  VALUES (6, 1, 'ROLEX GMT-MASTER II','Root Beer de 40mm 2024', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO productos
  VALUES (7, 2, 'ROLEX GMT-MASTER II','Root Beer de 40mm 2024', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO productos
  VALUES (8, 3, 'ROLEX GMT-MASTER II','Root Beer de 40mm 2024', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO productos
  VALUES (9, 4, 'ROLEX GMT-MASTER II','Root Beer de 40mm 2024', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO productos
  VALUES (10, 5, 'ROLEX GMT-MASTER II','Root Beer de 40mm 2024', DEFAULT, DEFAULT, DEFAULT);
  
  
  
  
  INSERT INTO comentarios
  VALUES (DEFAULT, 1, 1, 'Increible Reloj, me encanta!', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO comentarios
  VALUES (DEFAULT, 1, 2, 'Increible Reloj, me encanta!', DEFAULT, DEFAULT, DEFAULT);
  
  INSERT INTO comentarios
  VALUES (DEFAULT, 3, 3, 'Increible Reloj, me encanta!', DEFAULT, DEFAULT, DEFAULT);