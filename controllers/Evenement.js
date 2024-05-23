
import Evenement from '../models/Evenement.js';

export function getAll(req, res) {
    Evenement.find({})
    .select("_id name description heure lieu DateDebut DateFin")
    .exec()
    .then(Evenement => {
        res.status(200).json(Evenement);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

//export function addOnce(req, res) {
 //   const Evenement = new Evenement(req.body);
   // Evenement.save()
    //    .then(newEvenement => {
     //       res.status(201).json(newEvenement);
      //  })
       // .catch(err => {
       //     res.status(500).json(err);
       // });
//}

export function addOnce(req, res) {
    const Evenement = new Evenement(req.body);
    Evenement.save()
    .then(newEvenement => {
        res.status(201).json({
            name: newEvenement.name,
            description: newEvenement.description,
            heure: newEvenement.heure,
            lieu: newEvenement.lieu,
            DateDebut: newEvenement.DateDebut,
            DateFin: newEvenement.DateFin,

        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
}


export function getOnce(req, res) {
    Evenement.findById(req.params.id)
    .then(Evenement => {
        res.status(200).json(Evenement);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function deleteOnce(req, res) {
    Evenement.findByIdAndDelete(req.params.id)
    .then(Evenement => {
        res.status(200).json(Evenement);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

export function putOnce(req, res) {
    Evenement.findByIdAndUpdate(req.params.id ,req.body)
    .then(Evenement => {
        res.status(200).json(err);
    })
    .catch(err => {
        res.status(500).json(err);
    });

    


    // sync function deleteServiceWithEvenements(serviceId) {
    //     try {
    //         const service = await Service.findById(serviceId);
    //         if (service) {
    //             await service.remove();
    //             console.log('Service and related Evenements deleted successfully');
    //         } else {
    //             console.log('Service not found');
    //         }
    //     } catch (err) {
    //         console.error('Error deleting service and related reclamations:', err);
    //     }
    // }

}