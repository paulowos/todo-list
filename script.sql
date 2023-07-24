USE todo

CREATE TABLE user
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE todo
(
  id SERIAL PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  userId INTEGER REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO user ( name, email, password  ) VALUES(
  'Teste', 'test@test', 'test'   
);

INSERT INTO todo ( task, userId ) VALUES(
  'Teste', 1
);
