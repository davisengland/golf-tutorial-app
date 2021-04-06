INSERT INTO users (email, hash, first_name, last_name)
VALUES ($1, $2, $3, $4)
returning *;