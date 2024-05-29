import express from 'express';
import mongoose from 'mongoose';
import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import EvenementRoute from './routes/Evenement.js';
import TypeEvenementRoute from './routes/TypeEvenement.js';
import ReservationRoute from './routes/reservation.js';
import userRoute from './routes/User.js';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 9090;
const database = "evento";

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
app.use(express.urlencoded({extended:true}));
app.use("/img",express.static('public/images'));



app.use('/Evenement', EvenementRoute);
app.use('/TypeEvenement', TypeEvenementRoute);
app.use('/reservation', ReservationRoute);
// app.use('/evenements', EvenementRoute);
app.use('/User', userRoute);
app.use("/images", express.static("public/images"));


app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});



//http://127.0.0.1:9090/TypeEvenement/610f888b03b429001cbbd2ae