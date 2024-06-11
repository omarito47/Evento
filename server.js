import express from 'express';
import mongoose from 'mongoose';
import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import salleRoute from './routes/salle.js';
import typeSalleRoute from './routes/typeSalle.js';
import reservationSalleRoute from './routes/reservationSalle.js';
import userRoute from './routes/user.js';
import ratingRoute from './routes/rating.js'
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9090;
const database = "Evento";

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://127.0.0.1:27017/${database}`)
.then(() => {
  console.log(`Connected to ${database} database`);
})
.catch(err => {
  console.log(`Error connecting to ${database} database`, err);
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));


app.use('/salle', salleRoute);
app.use('/typeSalle', typeSalleRoute);
app.use('/reservationSalle', reservationSalleRoute);
app.use('/user', userRoute);
app.use('/rating', ratingRoute);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});