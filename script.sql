USE todo

CREATE TABLE users
(
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks
(
  id CHAR(8) PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  userId CHAR(36) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (id, name, email, password  ) VALUES(
  '36b8f84d-df4e-4d49-b662-bcde71a8764f',
  'Teste', 
  'teste@teste.com',
  '$argon2id$v=19$m=65536,t=3,p=4$KvjALcdeCyhnKm03D8OyMg$blhWago0QpBiny1O0humQll9ndOQKfeY//NEfFqOddI'  
  -- senha 'teste123456' 
);

INSERT INTO tasks (id, task, userId ) VALUES(
  'dac0d3bc', 'Teste', '36b8f84d-df4e-4d49-b662-bcde71a8764f'
);
