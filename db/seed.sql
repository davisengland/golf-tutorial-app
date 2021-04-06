DROP TABLE IF EXISTS users, tutorials, history;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  hash TEXT,
  first_name VARCHAR(255),
  last_name VARCHAR(255)
);

CREATE TABLE tutorials(
    tutorial_id SERIAL PRIMARY KEY,
    iframe_tag TEXT,
    description VARCHAR(1000)
);

CREATE TABLE history(
    tutorial_id INT REFERENCES tutorials(tutorial_id),
    user_id INT REFERENCES users(user_id)
);