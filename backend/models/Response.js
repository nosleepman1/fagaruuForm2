const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  submittedAt: { type: Date, default: Date.now },
  metadata: {
    ip: String,
    userAgent: String,
    duration: Number // seconds to complete
  },

  // Section 1 - Toi en quelques mots
  Q1: String,                  // Âge
  Q2: String,                  // Sexe
  Q3: String, Q3_ville: String, // Zone + Ville/Commune/Village
  Q4: String,                  // Situation actuelle
  Q5: String, Q5_autre: String, // Avec qui vis-tu + Autre
  Q6: [String],                // Langues parlées

  // Section 2 - Ce que tu sais déjà sur la santé reproductive
  Q7: [String],                // Éducation reçue sur la santé reproductive
  Q8: String,                  // Âge de la première information
  Q9: Number,                  // Niveau de connaissance (échelle 1–5)
  Q10: [String], Q10_autre: String, // Sujets souhaités + Autre

  // Section 3 - Où vas-tu chercher tes informations aujourd'hui ?
  Q11: [String],               // Sources consultées en premier
  Q12: String,                 // Source la plus fiable (texte libre)
  Q13: String,                 // Source la plus utilisée (texte libre)
  Q14: [String],               // Types de contenus internet consultés
  Q15: String, Q15_detail: String, // Information fausse reçue + Sujet

  // Section 4 - Ce qui est difficile à aborder
  Q16: String,                 // Facilité à parler de santé reproductive
  Q17: [String],               // Freins à poser ses questions
  Q18: String, Q18_detail: String, // Sujets jamais abordés + Détail
  Q19: String, Q19_detail: String, // Connaissance d'un endroit adapté + Lequel

  // Section 5 - Ce que tu attendrais d'une plateforme comme FAGARU
  Q20: String,                 // Utilisation d'une app/site anonyme
  Q21: [String],               // Format d'accès à l'information
  Q22: String, Q22_autre: String, // Langue préférée + Autre langue
  Q23: String,                 // Canal d'accès préféré
  Q24: String,                 // Fréquence d'utilisation prévue

  // Section 6 - Module « Pose ta question » anonyme
  Q25: String,                 // Utilité du module anonyme
  Q26: String,                 // Confiance envers le répondant
  Q27: String,                 // Délai de réponse souhaité
  Q28: [String],               // Conditions acceptées pour poser une question

  // Section 7 - Confiance et confidentialité
  Q29: [String],               // Inquiétudes concernant la plateforme
  Q30: Number,                 // Confiance dans une plateforme officielle (échelle 1–5)
  Q31: [String],               // Acteurs de promotion souhaitée

  // Section 8 - Ton accès au numérique
  Q32: String,                 // Type de téléphone
  Q33: String,                 // Mode de connexion internet
  Q34: String,                 // Temps passé sur téléphone/internet
  Q35: [String], Q35_autre: String, // Réseaux sociaux utilisés + Autre

  // Section 9 - Tes idées et tes mots
  Q36: String,                 // Question à un médecin (texte libre)
  Q37: String,                 // Ce qui ferait adopter FAGARU (texte libre)
  Q38: String,                 // Ce qui freinerait l'adoption (texte libre)
  Q39: String,                 // Message/suggestion à l'équipe (texte libre)

  // Section 10 - Et après ?
  Q40: String,                 // Intérêt pour la phase de test
  Q40_prenom: String,          // Prénom ou pseudonyme (si Oui)
  Q40_contact: String          // WhatsApp ou e-mail (si Oui, facultatif)

}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);