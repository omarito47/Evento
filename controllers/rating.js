
import User from '../models/user.js';
import Salle from '../models/salle.js';
import Rating from '../models/Rating.js';

export function getAll(req, res) {
    Rating.find({})
    .then(rating => {
        res.status(200).json(rating);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export const addRating = async (req, res) => {
    const { idSalle, idUser, ratingValue } = req.body;

    try {
        const salle = await Salle.findById(idSalle);
        if (!salle) {
            return res.status(404).json({ message: 'Salle non trouvée' });
        }

        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const existingRating = await Rating.findOne({ idUser, idSalle });
        if (existingRating) {
            existingRating.ratingValue = ratingValue;
            await existingRating.save();
            return res.status(200).json({ message: 'Notation modifiée avec succès' });
        } else {
            const newRating = await Rating.create({ idUser, idSalle, ratingValue });
            salle.ratings.push(newRating._id);
            await salle.save();

            // Ajouter la nouvelle notation au tableau des notations de l'utilisateur
            user.ratings.push(newRating._id);
            await user.save();

            return res.status(201).json({ message: 'Notation ajoutée avec succès' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const deleteRating = async (req, res) => {
    const { id } = req.params;

    try {
        const rating = await Rating.findByIdAndDelete(id);
        if (!rating) {
            return res.status(404).json({ message: 'Notation non trouvée' });
        }

        const salle = await Salle.findOne({ ratings: rating._id });
        if (!salle) {
            return res.status(404).json({ message: 'Salle non trouvée' });
        }

        // Retirer la notation du tableau de notations de la salle
        salle.ratings.pull(rating._id);
        salle.save(); // Pas besoin d'attendre ici car l'ID de la notation est déjà retiré du tableau

        const user = await User.findById(rating.idUser);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Retirer la notation du tableau de notations de l'utilisateur
        user.ratings.pull(rating._id);
        user.save(); // Pas besoin d'attendre ici car l'ID de la notation est déjà retiré du tableau

        res.status(200).json({ message: 'Notation supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


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

 