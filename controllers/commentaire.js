
import Commentaire from '../models/commentaire.js';
import reclamation from '../models/reclamation.js';

// export function getCommentairesByReclamation(req, res) {
//     Commentaire.find({reclamationComment:req.params.id})
//     .then(Commentaires => {
//         res.status(200).json(Commentaires);
//     })
//     .catch(err => {
//         res.status(500).json(err);
//     });
// }

export function getCommentairesByReclamation(req, res) {
    Commentaire.find({usercomment:req.params.iduser ,reclamationComment:req.params.idrec })
    .then(Commentaires => {
        res.status(200).json(Commentaires);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
export function addCommentaire(req, res) {
    const commentaire = new Commentaire(req.body);
    console.log(commentaire);
    commentaire.save()
        .then(newCommentaire => {
            res.status(201).json(newCommentaire);
        })
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
}
// export function getServiceById(req, res) {
//     Service.findById(req.params.id)
//     .then(service => {
//         res.status(200).json(service);
//     })
//     .catch(err => {
//         res.status(500).json(err);
//     });
// }
export function deleteCommentaire(req, res) {
    Commentaire.findByIdAndDelete(req.params.id)
    .then(Commentaire => {
        res.status(200).json(Commentaire);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
export function updateCommentaire(req, res) { 
    Service.findByIdAndUpdate(req.params.idCom, {description:req.body.description})
    .then(comment => {
        res.status(200).json(comment);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export async function satisfaitComment(req, res) {

    try {
        const comment = await Commentaire.findByIdAndUpdate(req.params.id,{selection:true}); 
        console.log(comment);
        // const rec = await reclamation.findByIdAndUpdate({_id:comment.reclamationComment},{etat:true , status:false} ); 
        // console.log(rec);
        res.status(200).json(rec);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function nonSatisfaitComment(req, res) {

    try {
        const comment = await Commentaire.findByIdAndUpdate(req.params.id,{selection:false}); 
        console.log(comment);
        // const rec = await reclamation.findByIdAndUpdate({_id:comment.reclamationComment},{etat:false , status:true} ); 
        // console.log(rec);
        res.status(200).json(rec);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}