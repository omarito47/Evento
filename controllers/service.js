
import Service from '../models/service.js';
import Reclamation from '../models/reclamation.js';
import { validationResult } from 'express-validator';
validationResult
export function getAll(req, res) {
    Service.find({})
    .select("_id libelle ")
    .exec()
    .then(services => {
        res.status(200).json(services);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function addOnce(req, res) {
    if(validationResult(req).isEmpty()){
        const service = new Service(req.body);
        service.save()
        .then(newservice => {
            res.status(201).json(newservice);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }else{
        res.status(400).json({error:validationResult(req).array()})
    }

    
}

export function getOnce(req, res) {
    Service.findById(req.params.id)
    .then(service => {
        res.status(200).json(service);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
export function deleteOnce(req, res) {
    Service.findByIdAndDelete(req.params.id)
    .then(service => {
        Reclamation.deleteMany({typeReclamation:service._id})
        .then(()=>{
            res.status(200).json(service);
        }).catch(err => {
            res.status(500).json(err);
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
}


export function putOnce(req, res) {
    Service.findByIdAndUpdate(req.params.id, req.body)
    .then(service => {
        res.status(200).json(service);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}