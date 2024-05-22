
import Reclamation from '../models/reclamation.js';

export function getAll(req, res) {
    Reclamation.find({})
    .select("_id title description etat")
    .exec()
    .then(reclamations => {
        res.status(200).json(reclamations);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function addOnce(req, res) {
    const reclamation = new Reclamation(req.body);
    reclamation.save()
    .then(newReclamation => {
        res.status(201).json({
            title: newReclamation.title,
            description: newReclamation.description,
            etat: newReclamation.etat,
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function getOnce(req, res) {
    Reclamation.findById(req.params.id)
    .then(reclamation => {
        res.status(200).json(reclamation);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function deleteOnce(req, res) {
    Reclamation.findByIdAndDelete(req.params.id)
    .then(reclamation => {
        res.status(200).json(reclamation);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function putOnce(req, res) {
    Reclamation.findByIdAndUpdate(req.params.id, req.body)
    .then(reclamation => {
        res.status(200).json(reclamation);
    })
    .catch(err => {
        res.status(500).json(err);
    });

}




