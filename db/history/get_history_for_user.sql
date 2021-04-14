SELECT history.embed_id, history.user_id FROM history
JOIN users ON history.user_id = users.user_id
WHERE history.user_id = $1;