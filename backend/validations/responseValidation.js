const validateSubmitResponse = (req, res, next) => {
  // Required fields based on questions.json (required: true)
  const requiredFields = [
    // Section 1 - Toi en quelques mots
    'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6',
    // Section 2 - Ce que tu sais déjà
    'Q7', 'Q8', 'Q9',
    // Section 4 - Ce qui est difficile à aborder
    'Q16',
    // Section 5 - Ce que tu attendrais de FAGARU
    'Q20', 'Q22', 'Q23', 'Q24',
    // Section 6 - Module anonyme
    'Q25',
    // Section 7 - Confiance et confidentialité
    'Q30',
    // Section 8 - Ton accès au numérique
    'Q32', 'Q33', 'Q34',
    // Section 10 - Et après ?
    'Q40'
  ];

  const missingFields = requiredFields.filter((key) => {
    const value = req.body[key];
    if (value === undefined || value === null || value === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    return false;
  });

  if (missingFields.length > 0) {
    return res.status(400).json({ success: false, error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  next();
};

module.exports = {
  validateSubmitResponse
};