import Salle from '../models/salle.js';
import Rating from '../models/Rating.js';
import ReservationSalle from '../models/reservationSalle.js';
import TypeSalle from '../models/typesalle.js';


export function getAll(req, res) {
    Salle.find({})
    // .select('name') // Ne retourner que les attributs mentionnés (séparés par des espace si plusieurs)
    // .exec() // Executer la requête
    .then(salles => {
        res.status(200).json(salles);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function addOnce(req, res) {
    Salle
    .create({
        
      nomSalle:req.body.nomSalle,
        description:req.body.description,
        lieu:req.body.lieu,
        prix:req.body.prix,
        image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
        typeSalle:req.body.typeSalle
 
    })
    .then(newSalle => {
        res.status(200).json({newSalle});
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}



export function getOnce(req, res) {
    
    Salle.findById(req.params.id)
    .then(salle => {
        res.status(200).json(salle);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}



/**
 * Mettre à jour un seul document
 */
export function putOnce(req, res) {
    Salle.findByIdAndUpdate(req.params.id, req.body , { new: true })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}


export function deleteOnce(req, res) {
    const { id } = req.params;

    Salle.findByIdAndDelete(id)
        .then(async (salle) => {
            if (!salle) {
                return res.status(404).json({ message: 'Salle non trouvée' });
            }

            try {
                // Supprimer les réservations associées
                await ReservationSalle.deleteMany({ idSalle: salle._id });

                // Supprimer les notations associées
                await Rating.deleteMany({ idSalle: salle._id });

                res.status(200).json({ message: 'Salle, notations et réservations associées supprimées avec succès' });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}




//rechercher salle

export async function searchSalle(req, res) {
    try {
        const { key } = req.params;
        let query = {};

        // Vérifier si la valeur est un nombre (prix)
        if (!isNaN(key)) {
            query.prix = parseInt(key);
        } else {
            // Recherche par nomSalle ou lieu si la valeur n'est pas un nombre
            query["$or"] = [
                { nomSalle: { $regex: new RegExp(key.replace(/\s/g, ''), 'i') } }, // Ignorer les espaces et la casse
                { lieu: { $regex: new RegExp(key.replace(/\s/g, ''), 'i') } }, // Ignorer les espaces et la casse
            ];
        }

        let searchedSalles = await Salle.find(query);

        res.status(200).json(searchedSalles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la recherche des salles." });
    }
}


//la salle la mieux notée
export const getHighestRatedSalle = async (req, res) => {
    try {
        const salles = await Salle.find().populate('ratings');

        if (!salles || salles.length === 0) {
            return res.status(404).json({ message: 'Aucune salle trouvée.' });
        }

        let highestRatedSalle = null;
        let highestAverageRating = 0;

        salles.forEach(salle => {
            if (salle.ratings.length > 0) {
                const totalRating = salle.ratings.reduce((sum, rating) => sum + rating.ratingValue, 0);
                const averageRating = totalRating / salle.ratings.length;

                if (averageRating > highestAverageRating) {
                    highestAverageRating = averageRating;
                    highestRatedSalle = salle;
                }
            }
        });

        if (!highestRatedSalle) {
            return res.status(404).json({ message: 'Aucune salle trouvée.' });
        }

        res.status(200).json({
            nomSalle: highestRatedSalle.nomSalle,
            ratings: highestRatedSalle.ratings,
            averageRating: highestAverageRating
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//la salle la plus réservée
export const getMostReservedSalle = async (req, res) => {
    try {
        const salles = await Salle.find().populate('reservations');

        if (!salles || salles.length === 0) {
            return res.status(404).json({ message: 'Aucune salle trouvée.' });
        }

        let mostReservedSalle = null;
        let maxReservations = 0;

        salles.forEach(salle => {
            const reservationCount = salle.reservations.length;

            if (reservationCount > maxReservations) {
                maxReservations = reservationCount;
                mostReservedSalle = salle;
            }
        });

        if (!mostReservedSalle) {
            return res.status(404).json({ message: 'Aucune salle trouvée.' });
        }

        res.status(200).json({
            nomSalle: mostReservedSalle.nomSalle,
            reservations: mostReservedSalle.reservations,
            reservationCount: maxReservations
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};