
import User from '../models/user.js';


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
export function deleteUser (req, res)  {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then((user) => {
      if (user) {
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
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
