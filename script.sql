USE todo

CREATE TABLE users
(
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE todos
(
  id SERIAL PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  userId CHAR(36) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (id, name, email, password  ) VALUES(
  '36b8f84d-df4e-4d49-b662-bcde71a8764f','Teste', 'test@test.com', 'test12345678'   
);

INSERT INTO todos ( task, userId ) VALUES(
  'Teste', '36b8f84d-df4e-4d49-b662-bcde71a8764f'
);
