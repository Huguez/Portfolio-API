
<p align="center">
   <a href="https://expressjs.com/" target="blank"><img src="https://expressjs.com/og/home-en.png" width="550" alt="Express Logo" /></a>
</p>

<p align="center">
   A popular software development <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building websites.
</p>

<br/>

<h1 align="center">Personal Portfolio </h1>
<p align="justify">
   The purpose of this repository is to create a space for sharing software development projects, experiments, and examples that reflect my experience, learning, and evolution as a developer; it is also intended to be explored, analyzed, and used as a reference. I invite you to review the implementation, architecture, and technical decisions behind each project.
</p>

<br/>

<h3 align="left">Run in development</h3>

1.- Clone the repository
```bash
$ https://github.com/Huguez/Portfolio-API.git
```

2.- Install dependencies
```bash
$ npm install
```

3.- rename .env.template to .env and write variables
```
CONTAINER_NAME  = ********
MONGODB_PORT    = ********
SECRET_KEY_JWT  = ********

CLOUD_NAME       = ********
CLOUD_API_KEY    = ********
CLOUD_API_SECRET = ********
CLOUDINARY_URL   = ********

DB_CNN     = ********
PORT       = ********
DATABASE   = ********

EMAIL      = ********

# default
NODE_ENV=develop
```

4.- execute command
```bash
$ docker compose up -d
```

5.- Run the service in development
```$
$ npm run dev
```