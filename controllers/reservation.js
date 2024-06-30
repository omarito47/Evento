import Evenement from '../models/Evenement.js';
import Reservation from '../models/reservation.js';
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
export function putOnceReservation(req, res) {
    reservation.findByIdAndUpdate(req.params.id, req.body)
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
export function filterReservationsByStatus(req, res) {
    const { status } = req.params;

    Reservation.find({ etat: status })
        .then(reservations => {
            res.status(200).json({ reservations });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error filtering reservations', error: err });
        });
}

// Fonction pour obtenir l'historique des réservations
export async function getReservationHistory(req, res) {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
  
      res.status(200).json(reservation.history);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


