

import atelier from '../models/atelier.js';
import Atelier from '../models/atelier.js';

export function getAll(req, res) {
    Atelier.find({})
    .select("_id nom description lieu date_debut date_fin nbr_place frequence_de_repetition prix ")
    .exec()
    .then(ateliers => {
        res.status(200).json(ateliers);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function addOnce(req, res) {
    const atelier = new Atelier(req.body);
    atelier.save()
    .then(newAtelier => {
        res.status(201).json({
            nom: newAtelier.nom,
            description: newAtelier.description,
            lieu: newAtelier.lieu,
            date_debut: newAtelier.date_debut,
            date_fin: newAtelier.date_fin,
            nbr_place: newAtelier.nbr_place_place,
            frequence_de_repetition: newAtelier. frequence_de_repetition,
            prix: newAtelier.prix,


        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function getOnce(req, res) {
    Atelier.findById(req.params.id)
    .then(atelier => {
        res.status(200).json(atelier);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function deleteOnce(req, res) {
    Atelier.findByIdAndDelete(req.params.id)
    .then(atelier => {
        res.status(200).json(atelier);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function putOnce(req, res) {
    Atelier.findByIdAndUpdate(req.params.id, req.body)
    .then(atelier => {
        res.status(200).json(atelier);
    })
    .catch(err => {
        res.status(500).json(err);
    });

}
