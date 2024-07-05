import Salle from '../models/salle.js';
import TypeSalle from '../models/typesalle.js';

export function getAll(req, res) {
    TypeSalle.find({})
    // .select('name') // Ne retourner que les attributs mentionnés (séparés par des espace si plusieurs)
    // .exec() // Executer la requête
    .then(typesalles => {
        res.status(200).json(typesalles);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function addOnce(req, res) {

    TypeSalle
    .create(req.body)
    .then(newtypeSalle => {
        res.status(200).json(newtypeSalle);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function getOnce(req, res) {
   
    TypeSalle.findById(req.params.id)
    .then(typesalle => {
        res.status(200).json(typesalle);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}



/**
 * Mettre à jour un seul document
 */
export function putOnce(req, res) {
    TypeSalle
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(typesalle => {
        res.status(200).json(typesalle);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

/**
 * Supprimer un seul document
 */
// export function deleteOnce(req, res) {
//     TypeSalle
//     .findByIdAndDelete( req.params.id)
//     .then(typesalle => {
//         res.status(200).json({ message:"TypeSalle supprimé avec succès"  });
//     })
//     .catch(err => {
//         res.status(500).json({ error: err });
//     });
// }


export function deleteOnce(req, res) {
    TypeSalle.findByIdAndDelete(req.params.id)
    .then(typeSalle => {
        Salle.deleteMany({typeSalle:typeSalle._id})
        .then(()=>{
            res.status(200).json({ message: "TypeSalle supprimé avec succès." });
        }).catch(err => {
            res.status(500).json(err);
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
}