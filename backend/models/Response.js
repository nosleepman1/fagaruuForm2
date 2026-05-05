const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  submittedAt: { type: Date, default: Date.now },
  metadata: {
    ip: String,
    userAgent: String,
    duration: Number // seconds to complete
  },
  // Section 1 - Profil
  Q1: String,
  Q2: String,
  Q3: String, Q3_ville: String,
  Q4: String, Q4_autre: String,
  Q5: String,
  Q6: [String], Q6_autre: String,

  // Section 2 - Accès soins
  Q7: String,
  Q8: String,
  Q9: String,
  Q10: [String], Q10_autre: String,
  Q11: String,
  Q12: String,

  // Section 3 - Numérique
  Q13: String,
  Q14: String,
  Q15: [String],
  Q16: String,
  Q17: String, Q17_detail: String,

  // Section 4 - Téléconsultation
  Q18: String,
  Q19: [String],
  Q20: String,
  Q21: String,
  Q22: Number,

  // Section 5 - Dossier médical
  Q23: String, Q23_autre: String,
  Q24: String,
  Q25: String,

  // Section 6 - Paiement
  Q26: String,
  Q27: String,
  Q28: String,

  // Section 7 - Don de sang
  Q29: String, Q29_groupe: String,
  Q30: String,
  Q31: [String], Q31_autre: String,
  Q32: String, Q32_detail: String,
  Q33: String,
  Q34: String,

  // Section 8 - Assistant
  Q35: String, Q35_autre: String,
  Q36: String,
  Q37: [String],

  // Section 9 - Confiance
  Q38: [String],
  Q39: Number,
  Q40: [String],

  // Section 10 - Suggestions
  Q41: String,
  Q42: String,
  Q43: String,

  // Section 11 - Engagement
  Q44: String,
  Q44_prenom: String,
  Q44_telephone: String
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);