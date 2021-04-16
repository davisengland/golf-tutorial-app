SELECT videos.url, videos.user_id FROM videos
JOIN users ON videos.user_id = users.user_id
WHERE videos.user_id = $1;