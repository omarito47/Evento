import Evenement from '../models/Evenement.js';
// import TypeEvenement from '../models/TypeEvenement.js';
// import reservation from '../models/reservation.js';

import Event from '../models/Evenement.js';


export function getAll(req, res) {
    Event.find({})
        .select("_id nom description lieu DateDebut DateFin NombreParticipant priceTicket nombreDePlace categorie image ")
        .exec()
        .then(Evenement => {
            res.status(200).json(Evenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function addOnce(req, res) {
    const Event = new Evenement(req.body);
    Event.save()
        .then(Evenement => {
            res.status(201).json(Evenement);
        })
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
}

export function getOnce(req, res) {
    Event.findById(req.params.id)
        .then(Evenement => {
            res.status(200).json(Evenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function deleteOnce(req, res) {
    Event.findByIdAndDelete(req.params.id)
        .then(Evenement => {
            res.status(200).json(Evenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function putOnce(req, res) {
    Evenement.findByIdAndUpdate(req.params.id, req.body)
        .then(evenement => {
            res.status(200).json(evenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });

}

// fonction pour chercher un evenement par DateDebut
export function searchEvenement(req, res) {
    const { key } = req.params;
    const DateDebut = new Date(key);

    Evenement.find({ DateDebut: { $gte: DateDebut } })
        .then(evenement => {
            res.status(200).json(evenement);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// Rechercher des événements par catégorie
export function searchEvenementByCategory(req, res) {
    const category = req.params.category; // Récupérer la catégorie de la requête GET
    Evenement.find({ categorie: category }) // Rechercher les événements par catégorie
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "Aucun événement trouvé pour cette catégorie." });
            }
            res.status(200).json(result); // Retourner les événements trouvés
        })
        .catch(err => {
            res.status(500).json({ error: err.message }); // Gérer les erreurs
        });
}


// Fonction pour annuler une réservation
export async function cancelReservation(req, res) {
    try {
        const { eventId } = req.params;

        // Rechercher l'événement par ID
        const event = await Evenement.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Vérifier le nombre de participants
        if (event.nombreParticipant === 0) {
            // Annuler l'événement (par exemple, le supprimer de la base de données)
            await Evenement.findByIdAndDelete(eventId);
            return res.status(200).json({ message: 'Event cancelled due to zero participants' });
        } else {
            // Décrémenter le nombre de participants et incrémenter le nombre de places disponibles
            event.nombreParticipant -= 1;
            event.nombreDePlace += 1;
            await event.save();
            return res.status(200).json({ message: 'Reservation cancelled and number of places updated' });
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Contrôleur pour obtenir l'événement le plus visité

export const getMostVisitedEvent = async (req, res) => {
    try {
        const event = await Evenement.findOne().sort({ nombreParticipant: -1 }).exec(); // Trie et récupère l'événement avec le plus de participants
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Aucun événement trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
