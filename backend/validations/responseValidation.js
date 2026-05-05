const validateSubmitResponse = (req, res, next) => {
  const requiredFields = [
    'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6',
    'Q7', 'Q8', 'Q9', 'Q12',
    'Q13', 'Q14', 'Q16', 'Q17',
    'Q18', 'Q22',
    'Q23', 'Q24', 'Q25',
    'Q26',
    'Q35',
    'Q39',
    'Q44'
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