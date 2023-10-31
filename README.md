<h1 align="center" id="title">REST API Employer's Handbook</h1>

<p align="center"><img src="https://github.com/Parallite/REST-API-Employer-s-Handbook/blob/develop/icon/icon.png" alt="project-image"></p>

<p id="description">REST API Employer's Handbook - представляет собой небольшой веб-сервер реализованный с помощью Node.js и Express с аутентификацией JWT (JSON Web Tokens). В качестве базы данных используется MongoDB.</p>

<h2>🛠️ Installation Steps:</h2>

<p>1. Клонировать репозиторий:</p>

```
git clone  https://github.com/Parallite/REST-API-Employer-s-Handbook.git
```

<p>2. Установить зависимости:</p>

```
cd project_name npm install
```

<p>3. Создать файл .env и заполнить его по аналоги с имеющимся в проекте файлом .env.sample. Либо скопировать нижеприведенный дефолтный код и вставить его в файл .env</p>

```
PORT=8000
JWT_ACCESS_SECRET="JWT-TEST-ACCESS-SECRET"
JWT_REFRESH_SECRET="JWT-TEST-REFRESH-SECRET"
DB_URL="mongodb://localhost:27017/Handbook"
```

<p>4. Запустить сервер в режиме разработки:</p>

```
npm run server
```

<p>5. Перейти по адресу и ознакомиться с подробной документацией:</p>

```
API Document endpoints:
    swagger: http://localhost:YOURPORT/api-docs/

Дефолтный адрес:
    swagger: http://localhost:YOURPORT/api-docs/
```
