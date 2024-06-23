import User from '../models/user.js';
import ReservationSalle from '../models/reservationSalle.js';
import Rating from '../models/Rating.js';
import Salle from '../models/salle.js';

//sign in methode 
export function signin(req, res) {
  User.findOne({ username: req.body.na, password: req.body.password })
  .then(user => {
      if(user) {
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: "User not found" });
      }
  })
  .catch(err => {
      res.status(500).json(err);
  })
}
// sign up methode
export function signup(req, res) {
  const user = new User(req.body);
  user.save()
  .then(newUser => {
      res.status(201).json({
          username: newUser.username,
          password: newUser.password,
          wallet: newUser.wallet
      });
  })
  .catch(err => {
      res.status(500).json(err);
  });
}

// Créer un nouvel utilisateur
export function createUser  (req, res)  {
  const userData = req.body;
  const user = new User(userData);

  user.save()
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
};

// Lire tous les utilisateurs
export function getUsers  (req, res)  {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// Obtenir un utilisateur par son ID
export function getUserById (req, res)  {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// Mettre à jour un utilisateur
export function updateUser  (req, res)  {
  const userId = req.params.id;
  const newData = req.body;

  User.findByIdAndUpdate(userId, newData, { new: true })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// Supprimer un utilisateur
// export function deleteUser (req, res)  {
//   const userId = req.params.id;

//   User.findByIdAndDelete(userId)
//     .then((user) => {
//       if (user) {
//        return res.status(404).json({ error: 'Utilisateur non trouvé' });
//       }
//  // Supprimer les réservations associées
//  return ReservationSalle.deleteMany({ idUser: userId })
//  .then(() => {
//    // Supprimer les évaluations associées
//    return Rating.deleteMany({ idUser: userId });
//  })
//  .then(() => {
//    res.status(200).json({ message: 'Utilisateur, ses réservations et évaluations supprimés avec succès' });
//  });
// })
// .catch((error) => {
// res.status(500).json({ error: error.message });
// });
// }
export function deleteUser(req, res) {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
      .then((user) => {
          if (!user) {
              return res.status(404).json({ error: 'Utilisateur non trouvé' });
          }

          // Supprimer les réservations associées
          return ReservationSalle.find({ idUser: userId })
              .then((reservations) => {
                  const reservationIds = reservations.map(r => r._id);
                  return ReservationSalle.deleteMany({ idUser: userId })
                      .then(() => {
                          // Mettre à jour les documents Salle pour enlever les références aux réservations supprimées
                          const salleUpdatePromises = reservations.map(reservation => {
                              return Salle.updateOne(
                                  { reservations: reservation._id },
                                  { $pull: { reservations: reservation._id } }
                              );
                          });
                          return Promise.all(salleUpdatePromises);
                      });
              })
              .then(() => {
                  // Supprimer les évaluations associées
                  return Rating.find({ idUser: userId })
                      .then((ratings) => {
                          const ratingIds = ratings.map(r => r._id);
                          return Rating.deleteMany({ idUser: userId })
                              .then(() => {
                                  // Mettre à jour les documents Salle pour enlever les références aux évaluations supprimées
                                  const salleUpdatePromises = ratings.map(rating => {
                                      return Salle.updateOne(
                                          { ratings: rating._id },
                                          { $pull: { ratings: rating._id } }
                                      );
                                  });
                                  return Promise.all(salleUpdatePromises);
                              });
                      });
              })
              .then(() => {
                  res.status(200).json({ message: 'Utilisateur, ses réservations et évaluations supprimés avec succès' });
              });
      })
      .catch((error) => {
          res.status(500).json({ error: error.message });
      });
}


// Function to display users with the role 'admin'
export async function displayAdminUsers() {
  try {
    const adminUsers = await User.find({ role: 'admin' });
    console.log(adminUsers);
  } catch (error) {
    console.error(error);
  }
}

// Function to display users with the role 'user'
export async function displayRegularUsers() {
  try {
    const regularUsers = await User.find({ role: 'user' });
    console.log(regularUsers);
  } catch (error) {
    console.error(error);
  }
}

// Obtenir les réservations d'un utilisateur

export async function mesReservations(req, res) {
  const { userId } = req.params;

  try {
      // Recherche de l'utilisateur par son ID et sélection uniquement le tableau de réservations
      const user = await User.findById(userId).select('reservations');

      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Obtention des réservations de l'utilisateur
      const reservations = user.reservations;

      res.status(200).json({ reservations });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

