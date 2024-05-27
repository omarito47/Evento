
import Reclamation from '../models/reclamation.js';
import { ExpressValidator, validationResult } from 'express-validator';
import User from '../models/user.js';
import SendEmail from '../middlewares/mailer.js';



export function getReclamations(req, res) {
    Reclamation.find({})
    // .select("_id title description etat")
    // .exec()
    .then(reclamations => {
        res.status(200).json(reclamations);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}


// export function addOnce(req, res) {
//     if(validationResult(req).isEmpty()){
//         const reclamation = new Reclamation(req.body);
//         reclamation.save()
//         .then(newReclamation => {
//             res.status(201).json({
//                 title: newReclamation.title,
//                 description: newReclamation.description,
//                 etat: newReclamation.etat,
//             });
//             // main().catch(err => console.log(err));
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         });
//     }else{
//         res.status(400).json({error:validationResult(req).array()})
//     }
// }



export function addReclamation(req, res) {
    // if(validationResult(req).isEmpty()){
        Reclamation.create({
            title:req.body.title,
            description:req.body.description,
            email:req.body.email,
            numTelReclamation:req.body.numTelReclamation,
            pieceJointe: `${req.protocol}://${req.get("host")}/doc/${req.file.filename}`,
            typeReclamation:req.body.typeReclamation,
            userReclamation:req.body.userReclamation
        }
    )
        .then(newReclamation => {
            res.status(201).json(newReclamation);
            SendEmail().catch(err => console.log(err));
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
    // else{
    //     res.status(400).json({error:validationResult(req).array()})
    // }
// }

export function getReclamationById(req, res) {
    Reclamation.findById(req.params.id)
    .then(reclamation => {
        res.status(200).json(reclamation);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function deleteReclamation(req, res) {
    Reclamation.findByIdAndDelete(req.params.id)
    .then(reclamation => {
        res.status(200).json(reclamation);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function UpdateReclamation(req, res) {
    Reclamation.findByIdAndUpdate(req.params.id, req.body,{new:true})
    .then(reclamation => {
        res.status(200).json(reclamation);
    })
    .catch(err => {
        res.status(500).json(err);
    });

}

//*************************  Traitement des les Reclamations *************************** 
export function fermerReclamation(req, res) {
    Reclamation.findByIdAndUpdate(req.params.id, {status:false,etat:true},{new:true})
    .then(reclamation => {
        res.status(200).json(reclamation);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
export function OuvrireReclamation(req, res) {
    Reclamation.findByIdAndUpdate(req.params.id, {status:true,etat:false},{new:true})
    .then(reclamation => {
        res.status(200).json(reclamation);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
export function traiterReclamation(req, res) {
    Reclamation.findByIdAndUpdate(req.params.id, {etat:true})
    .then(reclamation => {
        User.findById(reclamation.userReclamation)
        .then(user =>{
            SendEmail(user.email)
            res.status(200).json(user);
            
        })
        .catch(err => {
            res.status(500).json(err);
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
//**************************************************************************************

//************ implimentation des metiers de recherches Pour les Reclamations *************** 
export async function searchReclamation(req,res){
    try {
        let searchedReclamations = await Reclamation.find(
            {
                "$or":[
                    {title:{$regex:req.params.key}},
                    {description:{$regex:req.params.key}},
                    {email:{$regex:req.params.key}},
                    {numTelReclamation:{$regex:req.params.key}}
                ]
            }
        )
        res.status(200).json(searchedReclamations);
    } catch (error) {
        console.log(err);
    }

}

export async function getReclamationsSortedByDate(req, res) {
    try {
        const sortedReclamations = await Reclamation.find().sort({ createdAt: -1 }); // Sort by date in descending order
        res.status(200).json(sortedReclamations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getReclamationsbyService(req,res){
    try {
        let searchedReclamationsByService = await Reclamation.find({typeReclamation:req.params.idService})
        res.status(200).json(searchedReclamationsByService);
    } catch (error) {
        console.log(err);
    }

}
export async function getReclamationsOuvert(req,res){
    try {
        let searchedReclamationsByStatus = await Reclamation.find({status:true})
        res.status(200).json(searchedReclamationsByStatus);
    } catch (error) {
        console.log(err);
    }

}
export async function getReclamationsFermer(req,res){
    try {
        let searchedReclamationsByStatus = await Reclamation.find({status:false})
        res.status(200).json(searchedReclamationsByStatus);
    } catch (error) {
        console.log(err);
    }

}

export function getReclamationsTraiter(req, res) {
    Reclamation.find({etat:true})
    .then(reclamationstraiters => {
        res.status(200).json(reclamationstraiters);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
export function getReclamationsNonTraiter(req, res) {
    Reclamation.find({etat:false})
    .then(reclamationsnontraiters => {
        res.status(200).json(reclamationsnontraiters);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
// ********************************************************************************************



