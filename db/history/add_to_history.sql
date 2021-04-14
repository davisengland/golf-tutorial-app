INSERT INTO history (embed_id, user_id)
VALUES ($1, $2);

SELECT history.embed_id, history.user_id FROM history
JOIN users ON history.user_id = users.user_id
WHERE history.user_id = $2;