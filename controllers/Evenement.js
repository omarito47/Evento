import Evenement from '../models/Evenement.js';
// import TypeEvenement from '../models/TypeEvenement.js';
// import reservation from '../models/reservation.js';

import Event from '../models/Evenement.js';


export function getAll(req, res) {
    Event.find({})
        .select("_id nom description lieu DateDebut DateFin NombreParticipant priceTicket image ")
        .exec()
        .then(Evenement => {
            res.status(200).json(Evenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function addOnce(req, res) {
    const Event = new Evenement(req.body);
    Event.save()
        .then(Evenement => {
            res.status(201).json(Evenement);
        })
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
}

export function getOnce(req, res) {
    Event.findById(req.params.id)
        .then(Evenement => {
            res.status(200).json(Evenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function deleteOnce(req, res) {
    Event.findByIdAndDelete(req.params.id)
        .then(Evenement => {
            res.status(200).json(Evenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function putOnce(req, res) {
    Event.findByIdAndUpdate(req.params.id, req.body)
        .then(Evenement => {
            res.status(200).json(Evenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });

}

export async function searchEvenement(req,res){
    try {
        let searchedEvenements = await Evenement.find(
            {
                "$or":[
                    {DateDebut:{$regex:req.params.key}},
                ]
            }
        )
        res.status(200).json(searchedEvenements);
    } catch (error) {
        console.log(err);
    }

}
