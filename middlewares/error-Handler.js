// middlewares/error-Handler.js

export function errorHandler(err, req, res) {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur');
}

export function notFoundError(req, res) {
  res.status(404).send('Page non trouvée');
}
