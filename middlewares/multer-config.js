<<<<<<< HEAD
import multer, { diskStorage } from "multer"; // Importer multer
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Les extensions à accepter
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

export default multer({
  // Configuration de stockage
  storage: diskStorage({
    // Configurer l'emplacement de stockage
    destination: (req, file, callback) => {
      const __dirname = dirname(fileURLToPath(import.meta.url)); // Récupérer le chemain du dossier courant
      callback(null, join(__dirname, "../public/images")); // Indiquer l'emplacement de stockage
    },
    // Configurer le nom avec lequel le fichier va etre enregistrer
    filename: (req, file, callback) => {
      // Remplacer les espaces par des underscores
      const name = file.originalname.split(" ").join("_");
      // Récupérer l'extension à utiliser pour le fichier
      const extension = MIME_TYPES[file.mimetype];
      //  Ajouter un timestamp Date.now() au nom de fichier
      callback(null, name + Date.now() + "." + extension);
    },
  }),
  // Taille max des images 10Mo
  limits: 10 * 1024 * 1024,
}).single("image"); // Le fichier est envoyé dans le body avec nom/clé 'image'
=======
import multer, { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

// export default function (image, size) {
//     return multer({
//         storage: diskStorage({
//             destination: (req, file, callback) => {
//                 const __dirname = dirname(fileURLToPath(import.meta.url));
//                 callback(null, join(__dirname, "../public/images"));
//             },
//             filename: (req, file, callback) => {
//                 const name = file.originalname.split(" ").join("_");
//                 const extension = MIME_TYPES[file.mimetype];
//                 callback(null, name + Date.now() + "." + extension);
//             },
//         }),
//         limits: size,
//     }).single(image);
// }

export default function (pieceJointe, size) {
    return multer({
      storage: diskStorage({
        destination: (req, file, callback) => {
          const __dirname = dirname(fileURLToPath(import.meta.url));
          callback(null, join(__dirname, "../public/documents"));
        },
        filename: (req, file, callback) => {
          const name = file.originalname.split(" ").join("_");
          const extension = MIME_TYPES[file.mimetype];
          callback(null, name + Date.now() + "." + extension);
        },
      }),
      limits: size,
    }).single(pieceJointe);
  }
>>>>>>> b382891c91f2fc6e5eca622d69679f22cf37ba1a
