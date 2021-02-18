const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const clarifai = require('./controllers/clarifaiapi');
const port = process.env.PORT;  //Before getting envrioment PORT, you need to set enviroment PORT first.  like PORT=3000 node server.js

 
const pg = knex({
	client:pg,
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
);


const app = express();

app.use(express.json()); // if you want to send by JSON, add it
app.use(cors());


app.post('/signin', (req, res) => {signin.handleSigin(req, res, pg, bcrypt)}) //dependency injection


app.post('/register', (req, res) => {register.handleRegister(req, res, pg, bcrypt)})


app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, pg) })


app.put('/image', (req, res) => { image.handleImage(req, res, pg) })

app.post('/clarifai', (req, res) => { clarifai.handleClarifai(req, res) })

app.listen(port, ()=> {
	console.log(`app is running on port ${port}`)
});

