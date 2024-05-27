import User from '../models/user.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
//sign in methode 
export function signIn(req, res) {
  const { email, password } = req.body;

  // Find the user by email in the database
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare the provided password with the hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        if (result) {
          // Passwords match, user is authenticated
          return res.status(200).json({ message: 'Authentication successful' });
        } else {
          // Passwords do not match, authentication failed
          return res.status(401).json({ error: 'Authentication failed' });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
export async function verifyUser(req, res) {
  const { userId, verificationCode } = req.params;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the verification code
    if (verificationCode != user.verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Update the user's verification status
    user.verified = true;
    user.verificationCode = ""; // Clear the verification code
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}

// const sendEmail = async (email) => {

//     const verificationCode = generateVerificationCode();

//     // Create a nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       // Set up your email service configuration
//       // For example, using Gmail SMTP:
//       service: 'Gmail',
//       auth: {
//         user: 'omar.taamallah@esprit.tn',
//         pass: 'nqjm xmey urlm eruj'
//       }
//     });   
//      // Configure the email options
//   const mailOptions = {
//     from: 'omar.taamallah@esprit.tn',
//     to: email,
//     subject: 'Verification Code',
//     text: `Your verification code is: ${verificationCode}`
//   };
//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ error: error});
//     } else {
//       res.status(200).json({ message: 'Verification code sent successfully' });
//     }
//   });

  

// }

// Generate a random 5-digit code
function generateVerificationCode() {
  return Math.floor(10000 + Math.random() * 90000);
}


// send email with verification code 
export function sendEmail(email, verificationCode) {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Set up your email service configuration
    // For example, using Gmail SMTP:
    service: 'Gmail',
    auth: {
      user: 'omar.taamallah@esprit.tn',
      pass: 'nqjm xmey urlm eruj'
    }
  });

  // Configure the email options
  const mailOptions = {
    from: 'omar.taamallah@esprit.tn',
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // Handle the error here or send an error response
    } else {
      console.log("Email sent:", info.response);
      // Handle the success or send a success response
    }
  });
}

// Créer un nouvel utilisateur

export function createUser(req, res) {
  const userData = req.body;
  const password = userData.password;

  // Generate a salt to use for hashing
  bcrypt.genSalt(5, (err, salt) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // Hash the password using the generated salt
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      // Replace the plain password with the hashed password
      userData.password = hash;

      // Create a new user with the encrypted password
      const user = new User(userData);
      
      // Generate a verification code
      const verificationCode = generateVerificationCode();

      // Set the verification code in the user object
      user.verificationCode = verificationCode;

      user.save()
        .then(newUser => {
          // Send verification code email
          sendEmail(user.email, verificationCode);

          // Send the response
          res.status(201).json(newUser);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    });
  });
}


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

