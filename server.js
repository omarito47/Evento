import express from 'express';
import mongoose from 'mongoose';
import { notFoundError, errorHandler } from './middlewares/error-handler.js';
<<<<<<< HEAD
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
=======
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
>>>>>>> b382891c91f2fc6e5eca622d69679f22cf37ba1a

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));


app.use('/salle', salleRoute);
app.use('/typeSalle', typeSalleRoute);
app.use('/reservationSalle', reservationSalleRoute);
app.use('/user', userRoute);
app.use('/rating', ratingRoute);
=======
app.use(express.urlencoded({extended:true}));
// app.use("/img",express.static('public/images'));
app.use('/public/images', express.static('public/images'));



app.use('/Evenement', EvenementRoute);
app.use('/TypeEvenement', TypeEvenementRoute);
app.use('/reservation', ReservationRoute);
app.use('/evenements', EvenementRoute);
app.use('/User', userRoute);
app.use("/images", express.static("public/images"));

>>>>>>> b382891c91f2fc6e5eca622d69679f22cf37ba1a

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
<<<<<<< HEAD
});
=======
});



//http://127.0.0.1:9090/TypeEvenement/610f888b03b429001cbbd2ae
>>>>>>> b382891c91f2fc6e5eca622d69679f22cf37ba1a
