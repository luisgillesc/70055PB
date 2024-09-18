import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import users from './routes/users.js';
import configurePassport from './config/passport.js';

const app = express();

// Middleware de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://luisgillesc:<X_qQQdG7HT6fPty>@coderback.wvpmo5m.mongodb.net/?retryWrites=true&w=majority&appName=CoderBack', { useNewUrlParser: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

// Middleware de Passport
app.use(passport.initialize());
configurePassport(passport);

// Rutas de usuario
app.use('/api/users', users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
