
import Service from '../models/service.js';
import Reclamation from '../models/reclamation.js';
import { validationResult } from 'express-validator';
validationResult
export function getServices(req, res) {
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


export function addService(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    Service.findOne({ libelle: req.body.libelle })
        .then(rec => {
            if (rec) {
                return res.status(400).json({ err: "Service existe déjà" });
            } else {
                const service = new Service(req.body);
                service.save()
                    .then(newService => {
                        res.status(201).json(newService);
                    })
                    .catch(err => {
                        res.status(500).json({ err: err.message });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
}




export function getServiceById(req, res) {
    Service.findById(req.params.id)
    .then(service => {
        res.status(200).json(service);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}


export function deleteService(req, res) {
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


export function updateService(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    Service.findOne({ libelle: req.body.libelle })
        .then(rec => {
            if (rec) {
                return res.status(400).json({ err: "Service existe déjà" });
            } else {
                Service.findByIdAndUpdate(req.params.id, req.body)
                .then(service => {
                    res.status(200).json(service);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
            }
        }).catch(err => {
            res.status(500).json({ err: err.message });
        });
}
export async function searchService(req,res){
    try {
        
        if(req.params.key){
            let searchedRServices = await Service.find({libelle:{$regex:req.params.key}})
            res.status(200).json(searchedRServices);
        }else {
            const allServices = await Service.find();
            return res.status(200).json(allServices);
        }

    } catch (error) {
        console.error('Error searching services:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}