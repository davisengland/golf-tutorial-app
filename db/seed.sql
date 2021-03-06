DROP TABLE IF EXISTS users;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  hash TEXT,
  first_name VARCHAR(255),
  last_name VARCHAR(255)
);

CREATE TABLE tutorials(
    tutorial_id SERIAL PRIMARY KEY,
    embed_id VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE history(
    embed_id VARCHAR(255),
    user_id INT REFERENCES users(user_id)
);

CREATE TABLE videos(
  url VARCHAR(500) UNIQUE,
  user_id INT REFERENCES users(user_id)
);