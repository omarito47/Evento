import ReservationSalle from '../models/reservationSalle.js';
import Salle from '../models/salle.js';
import User from '../models/user.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import {sendCancellationEmail} from '../services/emailService.js';

export function getAll(req, res) {
    ReservationSalle.find({})
    .then(reservationsalle => {
        res.status(200).json(reservationsalle);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}


export function getOnce(req, res) {
    
    ReservationSalle.findById(req.params.id)
    .then(reservationsalle => {
        res.status(200).json(reservationsalle);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}


export function addOnce(req, res) {
    const { dateDebut, dateFin, idSalle, email } = req.body;

    // Vérifier que la date de début est avant la date de fin ou égale si c'est une réservation d'une journée
    if (new Date(dateDebut) > new Date(dateFin)) {
        return res.status(400).json({ error: "La date de début doit être avant la date de fin" });
    }

    let nouvelleReservation;
    let salle;
    let userId; // Déclaration de la variable userId

    Salle.findById(idSalle)
        .then(salleData => {
            if (!salleData) {
                throw new Error('Salle non trouvée');
            }

            salle = salleData;

            // Vérifier les chevauchements de réservations pour la salle spécifiée
            return ReservationSalle.find({
                idSalle: idSalle,
                $or: [
                    { dateDebut: { $lt: new Date(dateFin), $gte: new Date(dateDebut) } }, // Date de début avant fin et après ou égale à début
                    { dateFin: { $gt: new Date(dateDebut), $lte: new Date(dateFin) } }, // Date de fin après début et avant ou égale à fin
                    { dateDebut: new Date(dateDebut), dateFin: new Date(dateFin) } // Date de début et de fin exactement égales à début et fin
                ]
            });
        })
        .then(chevauchements => {
            if (chevauchements.length > 0) {
                throw new Error('La salle est déjà réservée pour cette période');
            }

            // Trouver l'utilisateur par email
            return User.findOne({ email: email.toLowerCase() });
        })
        .then(user => {
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            userId = user._id; // Assigner l'ID de l'utilisateur à userId

            // Calcul du tarif
            const tarif = calculerTarif(dateDebut, dateFin, salle.prix);

            // Créer la réservation
            return ReservationSalle.create({
                dateDebut: new Date(dateDebut),
                dateFin: new Date(dateFin),
                tarif,
                idSalle: idSalle,
                idUser: userId, // Utiliser l'ID de l'utilisateur
                email: email 
            });
        })
        .then(newReservation => {
            nouvelleReservation = newReservation;

            // Mettre à jour le tableau de réservations de la salle
            return Salle.findByIdAndUpdate(idSalle, { $push: { reservations: newReservation._id } });
        })
        .then(() => {
            // Mettre à jour le tableau de réservations de l'utilisateur
            return User.findByIdAndUpdate(userId, { $push: { reservations: nouvelleReservation._id } });
        })
        .then(() => {
            // Envoi de l'e-mail de confirmation à l'adresse e-mail fournie par le client
            sendConfirmationEmail(email, nouvelleReservation, userId);

            res.status(200).json({ newReservation: nouvelleReservation, message: 'Réservation ajoutée avec succès' });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}



/**
 * Mettre à jour un seul document
 */export function putOnce(req, res) {
    const { dateDebut, dateFin, idSalle, email } = req.body;
    const reservationId = req.params.id;

    // Vérifier que la date de début est avant la date de fin ou égale si c'est une réservation d'une journée
    if (new Date(dateDebut) > new Date(dateFin)) {
        return res.status(400).json({ error: "La date de début doit être avant la date de fin" });
    }

    let ancienneReservation;
    let nouvelleSalle;
    let ancienSalleId;
    let ancienUtilisateur;
    let nouveauUtilisateur;
    let utilisateurEmailChange = false;

    ReservationSalle.findById(reservationId)
        .then(reservation => {
            if (!reservation) {
                throw new Error('Réservation non trouvée');
            }

            ancienneReservation = reservation;
            ancienSalleId = reservation.idSalle;

            // Vérifier si l'email a changé
            utilisateurEmailChange = reservation.email !== email;

            return Salle.findById(idSalle);
        })
        .then(salleData => {
            if (!salleData) {
                throw new Error('Salle non trouvée');
            }

            nouvelleSalle = salleData;

            // Vérifier les chevauchements de réservations pour la salle spécifiée
            return ReservationSalle.find({
                idSalle: idSalle,
                _id: { $ne: reservationId }, // Exclure la réservation actuelle
                $or: [
                    { dateDebut: { $lt: new Date(dateFin), $gte: new Date(dateDebut) } }, // Date de début avant fin et après ou égale à début
                    { dateFin: { $gt: new Date(dateDebut), $lte: new Date(dateFin) } }, // Date de fin après début et avant ou égale à fin
                    { dateDebut: new Date(dateDebut), dateFin: new Date(dateFin) } // Date de début et de fin exactement égales à début et fin
                ]
            });
        })
        .then(chevauchements => {
            if (chevauchements.length > 0) {
                throw new Error('La salle est déjà réservée pour cette période');
            }

            // Calcul du tarif
            const tarif = calculerTarif(dateDebut, dateFin, nouvelleSalle.prix);

            if (utilisateurEmailChange) {
                // Trouver l'ancien utilisateur
                return User.findById(ancienneReservation.idUser).then(user => {
                    ancienUtilisateur = user;
                    return User.findOne({ email });
                }).then(user => {
                    if (!user) {
                        throw new Error('Nouvel utilisateur non trouvé');
                    }
                    nouveauUtilisateur = user;
                    return { tarif, nouveauUtilisateur };
                });
            } else {
                return { tarif, nouveauUtilisateur: null };
            }
        })
        .then(({ tarif, nouveauUtilisateur }) => {
            // Mettre à jour la réservation avec le nouvel utilisateur si l'email a changé, sinon garder l'ancien utilisateur
            const updateData = {
                dateDebut: new Date(dateDebut),
                dateFin: new Date(dateFin),
                tarif,
                email,
                idSalle: idSalle,
                idUser: utilisateurEmailChange ? nouveauUtilisateur._id : ancienneReservation.idUser
            };

            return ReservationSalle.findByIdAndUpdate(
                reservationId,
                updateData,
                { new: true }
            );
        })
        .then(updatedReservation => {
            if (ancienSalleId.toString() !== idSalle) {
                // Si la salle a changé, mettre à jour les tableaux de réservations des deux salles
                return Salle.findByIdAndUpdate(
                    ancienSalleId,
                    { $pull: { reservations: reservationId } }
                ).then(() => {
                    return Salle.findByIdAndUpdate(idSalle, { $push: { reservations: updatedReservation._id } });
                }).then(() => {
                    if (utilisateurEmailChange) {
                        // Mettre à jour les réservations des utilisateurs
                        return User.findByIdAndUpdate(
                            ancienUtilisateur._id,
                            { $pull: { reservations: reservationId } }
                        ).then(() => {
                            return User.findByIdAndUpdate(
                                nouveauUtilisateur._id,
                                { $push: { reservations: updatedReservation._id } }
                            ).then(() => {
                                // Envoyer un email de mise à jour au nouvel email
                                sendConfirmationEmail(email, updatedReservation, nouveauUtilisateur._id);
                                res.status(200).json({ updatedReservation, message: 'Réservation mise à jour avec succès' });
                            });
                        });
                    } else {
                        // Envoyer un email de mise à jour à l'email spécifié
                        sendConfirmationEmail(email, updatedReservation, updatedReservation.idUser);
                        res.status(200).json({ updatedReservation, message: 'Réservation mise à jour avec succès' });
                    }
                });
            } else {
                if (utilisateurEmailChange) {
                    // Mettre à jour les réservations des utilisateurs
                    return User.findByIdAndUpdate(
                        ancienUtilisateur._id,
                        { $pull: { reservations: reservationId } }
                    ).then(() => {
                        return User.findByIdAndUpdate(
                            nouveauUtilisateur._id,
                            { $push: { reservations: updatedReservation._id } }
                        ).then(() => {
                            // Envoyer un email de confirmation au nouvel email
                            sendConfirmationEmail(email, updatedReservation, nouveauUtilisateur._id);
                            res.status(200).json({ updatedReservation, message: 'Réservation mise à jour avec succès' });
                        });
                    });
                } else {
                    // Envoyer un email de confirmation à l'email spécifié
                    sendConfirmationEmail(email, updatedReservation, updatedReservation.idUser);
                    res.status(200).json({ updatedReservation, message: 'Réservation mise à jour avec succès' });
                }
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}


export function deleteOnce(req, res) {
    ReservationSalle.findByIdAndDelete(req.params.id)
        .then(reservation => {
            if (!reservation) {
                return res.status(404).json({ error: "Réservation non trouvée" });
            }

            const salleId = reservation.idSalle; // Récupère l'ID de la salle associée à cette réservation

            // Supprime l'ID de cette réservation du tableau de réservations de la salle
            return Salle.findByIdAndUpdate(
                salleId,
                { $pull: { reservations: reservation._id } },
                { new: true }
            ).then(() => {
                // Mettre à jour le tableau de réservations de l'utilisateur
                return User.findByIdAndUpdate(
                    reservation.idUser, // Utilise l'ID de l'utilisateur associé à cette réservation
                    { $pull: { reservations: reservation._id } },
                    { new: true }
                );
            }).then(() => {
                // Envoi de l'e-mail d'annulation à l'adresse e-mail du client
                sendCancellationEmail(reservation.email, reservation);

                res.status(200).json({ message: "Réservation supprimée avec succès et tableaux des réservations mis à jour." });
            });
        })
        .catch(err => {
            res.status500.json({ error: err.message });
        });
}

function calculerTarif(dateDebut, dateFin, prixParJour) {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const dureeJours = Math.ceil((fin - debut) / (1000 * 60 * 60 * 24)) + 1; // Ajout de 1 si les dates sont égales
    return dureeJours * prixParJour;
}


