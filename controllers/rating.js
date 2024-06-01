

import Salle from '../models/salle.js';
import Rating from '../models/Rating.js';



export const addRating = async (req, res) => {
    const { idSalle, idUser, ratingValue } = req.body;

    try {
        const salle = await Salle.findById(idSalle);
        if (!salle) {
            return res.status(404).json({ message: 'Salle non trouvée' });
        }

        const existingRating = await Rating.findOne({ idUser, idSalle });
        if (existingRating) {
            existingRating.ratingValue = ratingValue;
            await existingRating.save();
            return res.status(200).json({ message: 'Notation modifiée avec succès' });
        } else {
            const newRating = await Rating.create({ idUser, idSalle, ratingValue });
            salle.ratings.push(newRating);
            await salle.save();
            return res.status(201).json({ message: 'Notation ajoutée avec succès' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export function deleteRating(req, res) {
    const { id } = req.params;

    Rating.findByIdAndDelete(id)
        .then(async (rating) => {
            if (!rating) {
                return res.status(404).json({ message: 'Notation non trouvée' });
            }

            // Trouver la salle à laquelle la notation appartient
            const salle = await Salle.findOne({ ratings: rating._id });
            if (!salle) {
                return res.status(404).json({ message: 'Salle non trouvée' });
            }

            // Retirer la notation du tableau de notations de la salle
            salle.ratings.pull(rating._id);
            await salle.save();

            res.status(200).json({ message: 'Notation supprimée avec succès' });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}


//id salle en parametre
export const getRatingsBySalle = async (req, res) => {
    const { idSalle } = req.params; 

    try {
        const salle = await Salle.findById(idSalle).populate('ratings.idUser', 'username'); 

        if (!salle) {
            return res.status(404).json({ message: 'Salle non trouvée' });
        }

        res.status(200).json({ ratings: salle.ratings});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

 