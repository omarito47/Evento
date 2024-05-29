import Evenement from '../models/Evenement.js';
import reservation from '../models/reservation.js';
import { validationResult } from 'express-validator';
validationResult

export function getReservation(req, res) {
    reservation.find({})
    // .select("_id title description etat")
    // .exec()
    .then(Reservation => {
        res.status(200).json(Reservation);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}


export function addReservation(req, res) {
    const Res = new reservation(req.body);
    Res.save()
        .then(newReservation => {
            res.status(201).json(newReservation);
        })
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
}

export function getReservationById(req, res) {
    reservation.findById(req.params.id)
    .then(reservation => {
        res.status(200).json(reservation);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function deleteReservation(req, res) {
    reservation.findByIdAndDelete(req.params.id)
    .then(reservation => {
        res.status(200).json(reservation);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}



export function res(req, res) {
    res.findByIdAndUpdate(req.params.id, {etat:true})
    .then(reservation => {
        User.findById(reservation.UserReservation)
        .then(User =>{
            SendEmail(User.email)
            res.status(200).json(User);

        })
        .catch(err => {
            res.status(500).json(err);
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
}



// export async function addReservation(req, res) {
//   try {
//     const { client, evenement, nombreParticipant } = req.body;

//     // Decrement the number of places available for the event
//     const event = await Evenement.findById(evenement);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     if (event.NbreDePlace < nombreParticipant) {
//       return res.status(400).json({ message: 'Not enough places available' });
//     }

//     event.NbreDePlace -= nombreParticipant;
//     await event.save();

//     // Create a new reservation
//     const reservation = new reservation({ client, evenement, nombreParticipant });
//     const newReservation = await reservation.save();

//     res.status(201).json(newReservation);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }




       



