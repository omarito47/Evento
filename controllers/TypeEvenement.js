import { validationResult } from 'express-validator';
import TypeEvenement from '../models/TypeEvenement.js';
import Evenement from '../models/Evenement.js';
import Event from '../models/Evenement.js';


export function getAll(req, res) {
    TypeEvenement.find({})
        .select("_id libele ")
        .exec()
        .then(TypeEvenement => {
            res.status(200).json(TypeEvenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function addOnce(req, res) {
    const typeEvenement = new TypeEvenement(req.body);
    typeEvenement.save()
        .then(newTypeEvenement => {
            res.status(201).json(newTypeEvenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function getOnce(req, res) {
    TypeEvenement.findById(req.params.id)
        .then(TypeEvenement => {
            res.status(200).json(TypeEvenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}
export function deleteOnce(req, res) {
    TypeEvenement.findByIdAndDelete(req.params.id)
        .then(TypeEvenement => {
            res.status(200).json(TypeEvenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}


export function putOnce(req, res) {
    TypeEvenement.findByIdAndUpdate(req.params.id, req.body)
        .then(TypeEvenement => {
            res.status(200).json(TypeEvenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}




// export function delet(req, res) {
//     TypeEvenement.findById(req.params.id)
//         .then(typeEvent => {
//             if (!typeEvent) {
//                 return res.status(404).json({ message: 'TypeEvenement not found' });
//             }
//             typeEvent.remove()
//                 .then(() => {
//                     res.status(200).json({ message: 'TypeEvenement and related Evenements deleted successfully' });
//                 })
//                 .catch(err => {
//                     res.status(500).json({ message: 'Error deleting TypeEvenement', error: err });
//                 });
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Error finding TypeEvenement', error: err });
//         });
// }

export function deleteTypeEvenement(req, res) {
    TypeEvenement.findById(req.params.id)
        .then(typeEvent => {
            if (!typeEvent) {
                return res.status(404).json({ message: 'TypeEvenement not found' });
            }
            // Supprimer les événements liés avant de supprimer le type d'événement
            Evenement.deleteMany({ typeEvent: req.params.id })
                .then(() => {
                    // Supprimer le type d'événement
                    typeEvent.remove()
                        .then(() => {
                            res.status(200).json({ message: 'TypeEvenement and related Evenements deleted successfully' });
                        })
                        .catch(err => {
                            res.status(500).json({ message: 'Error deleting TypeEvenement', error: err });
                        });
                })
                .catch(err => {
                    res.status(500).json({ message: 'TypeEvenement and related Evenements deleted successfully', });
                });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error finding TypeEvenement', error: err });
        });
}