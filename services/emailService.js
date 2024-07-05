// services/emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'EventoTunisia@outlook.com', // Remplacez par votre adresse email
    pass: 'esprit2024'         // Remplacez par votre mot de passe
  }
});

export function sendConfirmationEmail(to, reservation,userName) {
  const mailOptions = {
    from: 'EventoTunisia@outlook.com',
    to,
    subject: 'Confirmation de réservation',
    html: `
      <h1>Bonjour ${userName},</h1>
      <p>Vous êtes le bienvenu dans notre comité Evento !</p>
      <p>Votre réservation a été confirmée. Voici les détails de votre réservation :</p>
      <ul>
        <li><strong>Date de début :</strong> ${reservation.dateDebut}</li>
        <li><strong>Date de fin :</strong> ${reservation.dateFin}</li>
        <li><strong>Tarif :</strong> ${reservation.tarif}</li>
      </ul>
      <p>Merci de votre confiance et à très bientôt !</p>
    `};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export function sendCancellationEmail(to, reservation,userName) {
  const mailOptions = {
    from: 'EventoTunisia@outlook.com',
    to,
    subject: 'Annulation de réservation',
    html: `
    <h1>Bonjour ${userName},</h1>
    <p>Nous regrettons de vous informer que votre réservation a été annulée. Voici les détails de votre réservation annulée :</p>
    <ul>
      <li><strong>Date de début :</strong> ${reservation.dateDebut}</li>
      <li><strong>Date de fin :</strong> ${reservation.dateFin}</li>
      <li><strong>Tarif :</strong> ${reservation.tarif}</li>
    </ul>
    <p>Nous espérons vous revoir bientôt. Si vous avez des questions, n'hésitez pas à nous contacter.</p>
  `
};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
