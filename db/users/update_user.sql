UPDATE users
SET email = $1, first_name = $2, last_name = $3
WHERE user_id = $4;

SELECT * fROM users
WHERE user_id = $4;