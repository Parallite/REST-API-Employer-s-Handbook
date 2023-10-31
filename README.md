<h1 align="center" id="title">REST API Employer's Handbook</h1>

<p align="center"><img src="https://github.com/Parallite/REST-API-Employer-s-Handbook/blob/main/assets/icon/icon.png" alt="project-image"></p>

<p id="description">REST API Employer's Handbook - представляет собой небольшой веб-сервер реализованный с помощью Node.js и Express с аутентификацией JWT (JSON Web Tokens). В качестве базы данных используется MongoDB.</p>

<h2>🛠️ Шаги по установке:</h2>

<p>1. Клонировать репозиторий:</p>

```
git clone  https://github.com/Parallite/REST-API-Employer-s-Handbook.git
```

<p>2. Установить зависимости:</p>

```
cd project_name
```

```
npm install
```

<p>3. Создать файл .env и заполнить его по аналогии с имеющимся в проекте файлом .env.sample. Либо скопировать нижеприведенный дефолтный код и вставить его в файл .env</p>

```

PORT="8000"
JWT_ACCESS_SECRET="JWT-TEST-ACCESS-SECRET"
JWT_REFRESH_SECRET="JWT-TEST-REFRESH-SECRET"
DB_URL="mongodb://localhost:27017/Handbook"
CLIENT_URL="http://localhost:YOURCLIENTPORT"

```

<p>4. Запустить сервер в режиме разработки:</p>

```

npm run server

```

<p>5. Проверить статус сервера можно по адресу :</p>

```

http://localhost:YOURPORT/status

```

<p>или</p>

```

http://localhost:8000/status

```

<p>6. Перейти по адресу и ознакомиться с подробной документацией:</p>

<p>API Document endpoints swagger</p>

```

http://localhost:YOURPORT/api-docs/

```

<p>или</p>

```

http://localhost:8000/api-docs/

```

<h2>💻 Стек технологий:</h2>

- Node JS
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- JWT (bcrypt)
- Swagger

<h2>API endpoints:</h2>

<p>API Document endpoints swagger:</p>

```

http://localhost:8000/api-docs/

```

<p align="center"><img src="https://github.com/Parallite/REST-API-Employer-s-Handbook/blob/main/assets/endpoints/swagger.png" alt="swagger-endpoints-image"></p>
```
