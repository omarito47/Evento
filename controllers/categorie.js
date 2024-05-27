
import Categorie from '../models/categorie.js';
import Atelier from '../models/atelier.js';
import { validationResult } from 'express-validator';

validationResult


export function getAll(req, res) {
    Categorie.find({})
    .select("_id nom_categorie ")
    .exec()
    .then(categories => {
        res.status(200).json(categories);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function addOnce(req, res) {
    if(validationResult(req).isEmpty()){
        const categorie = new Categorie(req.body);
        categorie.save()
        .then(newcategorie => {
            res.status(201).json(newcategorie);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }else{
        res.status(400).json({error:validationResult(req).array()})
    }

    
}

export function getOnce(req, res) {
    Categorie.findById(req.params.id)
    .then(categorie => {
        res.status(200).json(categorie);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
export function deleteOnce(req, res) {
    Categorie.findByIdAndDelete(req.params.id)
    .then(categorie => {
       Atelier.deleteMany({typeAtelier:categorie._id})
        .then(()=>{
            res.status(200).json(categorie);
        }).catch(err => {
            res.status(500).json(err);
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
}


export function putOnce(req, res) {
    Categorie.findByIdAndUpdate(req.params.id, req.body)
    .then(categorie => {
        res.status(200).json(categorie);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}