// clone github
git clone https://github.com/nguyenandung/Chat-IO.git

// .env
DB_HOST=localhost
DB_PORT=8000 || tuy cau hinh port
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE=chat_db

JWT_ACCESS_TOKEN_SECRET=f10@2024_access_token
JWT_REFRESH_TOKEN_SECRET=f10@2024_refresh_token

// install dependencies

yarn

/\* chạy migration

npm run migration:run

/\* chạy seeder

npm run seed:run

/\* test postman

Create User:

- Post : localhost:3000/api/users

  Body:
  {
  "fullName": "nguyen-an",
  "email": "txo@gmail.com",
  "phoneNumber": "0867372692",
  "password": "1234",
  "roleCode": 1
  }

- Auth đăng nhập :
  Post : localhost:3000/auth/signin-with-credentials
  Nhập Body : {
  "username": "nguyen-an",
  "password": "1234"
  }

  copy access token để test api:
  -Tạo group chat :Post : localhost:3000/api/groups (có access_token)
  Body: {
  "name": "anh em cờrff hó"
  }

- Send message : Post : localhost:3000/api/messages (có access_token)
  Body: {
  "content": "anh em cờ hó",
  "groupId": 2
  }

- Get history : Get : (http://localhost:3000/api/messages?groupId=1&page=1&perPage=20)

- Test socket : Kết nối: ws://localhost:3000?token=<jwt_token>
  Gửi event:
  joinGroup: { "groupId": 1 }
  sendMessage: { "groupId": 1, "content": "Hello from WebSocket!" }
  Theo dõi event newMessage.
