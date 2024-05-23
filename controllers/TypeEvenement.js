import { validationResult } from 'express-validator';
import TypeEvenement from '../models/TypeEvenement.js';


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
    const TypeEvenement = new TypeEvenement(req.body);
    TypeEvenement.save()
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

export function deleteTypeEvenement(req, res) {
    const { id } = req.params;

    Evenement.deleteMany({ typeEvenement: id })
        .then(() => {
            return TypeEvenement.findByIdAndDelete(id);
        })
        .then(typeEvenement => {
            if (!typeEvenement) {
                return res.status(404).json({ message: 'Type d\'événement non trouvé' });
            }
            res.status(200).json({ message: 'Type d\'événement supprimé' });
        })
        .catch(err => res.status(500).json(err));
}