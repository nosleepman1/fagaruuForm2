const Response = require('../models/Response');

// POST - Soumettre un questionnaire
exports.submitResponse = async (req, res) => {
  try {
    const data = {
      ...req.body,
      metadata: {
        ip: req.ip,
        userAgent: req.get('user-agent'),
        duration: req.body._duration
      }
    };
    delete data._duration;

    const response = new Response(data);
    await response.save();
    res.status(201).json({ success: true, id: response._id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET - Statistiques globales
exports.getStats = async (req, res) => {
  try {
    const total = await Response.countDocuments();
    if (total === 0) return res.json({ total: 0 });

    const pipeline = (field, isArray = false) => [
      { $match: { [field]: { $exists: true, $ne: null, $ne: '' } } },
      { $unwind: isArray ? `$${field}` : { path: `$${field}`, preserveNullAndEmptyArrays: false } },
      { $group: { _id: `$${field}`, count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ];

    const avg = (field) => [
      { $match: { [field]: { $type: 'number' } } },
      { $group: { _id: null, avg: { $avg: `$${field}` }, count: { $sum: 1 } } }
    ];

    const [
      Q1, Q2, Q3, Q4, Q5, Q6,
      Q7, Q8, Q9, Q10, Q11, Q12,
      Q13, Q14, Q15, Q16, Q17,
      Q18, Q19, Q20, Q21, Q22avg,
      Q23, Q24, Q25,
      Q26, Q27, Q28,
      Q29, Q30, Q31, Q32, Q33, Q34,
      Q35, Q36, Q37,
      Q38, Q39avg, Q40,
      Q44
    ] = await Promise.all([
      Response.aggregate(pipeline('Q1')),
      Response.aggregate(pipeline('Q2')),
      Response.aggregate(pipeline('Q3')),
      Response.aggregate(pipeline('Q4')),
      Response.aggregate(pipeline('Q5')),
      Response.aggregate(pipeline('Q6', true)),
      Response.aggregate(pipeline('Q7')),
      Response.aggregate(pipeline('Q8')),
      Response.aggregate(pipeline('Q9')),
      Response.aggregate(pipeline('Q10', true)),
      Response.aggregate(pipeline('Q11')),
      Response.aggregate(pipeline('Q12')),
      Response.aggregate(pipeline('Q13')),
      Response.aggregate(pipeline('Q14')),
      Response.aggregate(pipeline('Q15', true)),
      Response.aggregate(pipeline('Q16')),
      Response.aggregate(pipeline('Q17')),
      Response.aggregate(pipeline('Q18')),
      Response.aggregate(pipeline('Q19', true)),
      Response.aggregate(pipeline('Q20')),
      Response.aggregate(pipeline('Q21')),
      Response.aggregate(avg('Q22')),
      Response.aggregate(pipeline('Q23')),
      Response.aggregate(pipeline('Q24')),
      Response.aggregate(pipeline('Q25')),
      Response.aggregate(pipeline('Q26')),
      Response.aggregate(pipeline('Q27')),
      Response.aggregate(pipeline('Q28')),
      Response.aggregate(pipeline('Q29')),
      Response.aggregate(pipeline('Q30')),
      Response.aggregate(pipeline('Q31', true)),
      Response.aggregate(pipeline('Q32')),
      Response.aggregate(pipeline('Q33')),
      Response.aggregate(pipeline('Q34')),
      Response.aggregate(pipeline('Q35')),
      Response.aggregate(pipeline('Q36')),
      Response.aggregate(pipeline('Q37', true)),
      Response.aggregate(pipeline('Q38', true)),
      Response.aggregate(avg('Q39')),
      Response.aggregate(pipeline('Q40', true)),
      Response.aggregate(pipeline('Q44')),
    ]);

    const timeline = await Response.aggregate([
      { $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' } },
        count: { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]);

    res.json({
      total,
      timeline,
      profil: { Q1, Q2, Q3, Q4, Q5, Q6 },
      acces: { Q7, Q8, Q9, Q10, Q11, Q12 },
      numerique: { Q13, Q14, Q15, Q16, Q17 },
      teleconsultation: { Q18, Q19, Q20, Q21, Q22: Q22avg[0] || null },
      dossier: { Q23, Q24, Q25 },
      paiement: { Q26, Q27, Q28 },
      sang: { Q29, Q30, Q31, Q32, Q33, Q34 },
      assistant: { Q35, Q36, Q37 },
      confiance: { Q38, Q39: Q39avg[0] || null, Q40 },
      engagement: { Q44 }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET - Toutes les réponses (pagination)
exports.getResponses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [responses, total] = await Promise.all([
      Response.find({}, '-Q44_telephone -metadata.ip').sort({ createdAt: -1 }).skip(skip).limit(limit),
      Response.countDocuments()
    ]);

    res.json({ responses, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET - Une réponse par ID
exports.getResponseById = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id, '-Q44_telephone -metadata.ip');
    if (!response) return res.status(404).json({ success: false, error: 'Response not found' });
    res.json({ response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};