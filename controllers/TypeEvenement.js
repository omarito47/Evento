import { validationResult } from 'express-validator';
import TypeEvenement from '../models/TypeEvenement.js';
import Evenement from '../models/Evenement.js';


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


export function delet(req, res) {
    TypeEvenement.findByIdAndDelete(req.params.id)
        .then(event => {
            Evenement.deleteMany({ typeEvent: req.params.id })
                .then(() => {
                    res.status(200).json(typeEvent);
                }).catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
}







// {
//     "name":"hhhhh",
//    "description" : "bbbbbb",
//    "DateDebut" : "11-5-2001",
//    "DateFin" : "11-6-2002",
//    "heure" : "11:00",
//    "lieu" : "11:00",
//    "NbreDePlace" : "02",
//    "PriceTicket" : "11"

// }
// export async function searchEvenement(req, res) {

//     const { categorie, date } = req.query;

//     let searchCriteria = {};

//     if (categorie) {
//         searchCriteria.categorie = categorie;
//     }

//     if (date) {
//         searchCriteria.date = { $gte: new Date(date) };
//     }

//     try {
//         const evenements = await Evenement.find(searchCriteria);
//         res.status(200).json(evenements);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }



