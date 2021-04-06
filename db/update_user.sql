UPDATE users
SET email = $1, hash = $2, first_name = $3, last_name = $4
WHERE user_id = $5
returning *;