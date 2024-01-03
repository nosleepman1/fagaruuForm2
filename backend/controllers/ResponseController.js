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

// GET - Statistiques globales (aligned with questions.json Q1-Q40)
exports.getStats = async (req, res) => {
  try {
    const total = await Response.countDocuments();
    if (total === 0) return res.json({ total: 0 });

    // Aggregation helper for radio/checkbox fields
    const pipeline = (field, isArray = false) => [
      { $match: { [field]: { $exists: true, $nin: [null, ''] } } },
      ...(isArray ? [{ $unwind: `$${field}` }] : []),
      { $group: { _id: `$${field}`, count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ];

    // Aggregation helper for scale fields (1-5)
    const avg = (field) => [
      { $match: { [field]: { $type: 'number' } } },
      { $group: { _id: null, avg: { $avg: `$${field}` }, count: { $sum: 1 } } }
    ];

    const [
      // Section 1 - Toi en quelques mots
      Q1, Q2, Q3, Q4, Q5, Q6,
      // Section 2 - Ce que tu sais déjà
      Q7, Q8, Q9avg, Q10,
      // Section 3 - Où vas-tu chercher tes informations
      Q11, Q14, Q15,
      // Section 4 - Ce qui est difficile à aborder
      Q16, Q17, Q18, Q19,
      // Section 5 - Ce que tu attendrais de FAGARU
      Q20, Q21, Q22, Q23, Q24,
      // Section 6 - Module anonyme
      Q25, Q26, Q27, Q28,
      // Section 7 - Confiance et confidentialité
      Q29, Q30avg, Q31,
      // Section 8 - Ton accès au numérique
      Q32, Q33, Q34, Q35,
      // Section 10 - Et après ?
      Q40
    ] = await Promise.all([
      // Section 1
      Response.aggregate(pipeline('Q1')),          // radio - Âge
      Response.aggregate(pipeline('Q2')),          // radio - Sexe
      Response.aggregate(pipeline('Q3')),          // radio - Zone
      Response.aggregate(pipeline('Q4')),          // radio - Situation
      Response.aggregate(pipeline('Q5')),          // radio - Avec qui vis-tu
      Response.aggregate(pipeline('Q6', true)),    // checkbox - Langues

      // Section 2
      Response.aggregate(pipeline('Q7', true)),    // checkbox - Éducation reçue
      Response.aggregate(pipeline('Q8')),          // radio - Âge première info
      Response.aggregate(avg('Q9')),               // scale 1-5 - Niveau connaissance
      Response.aggregate(pipeline('Q10', true)),   // checkbox - Sujets souhaités

      // Section 3
      Response.aggregate(pipeline('Q11', true)),   // checkbox - Sources consultées
      Response.aggregate(pipeline('Q14', true)),   // checkbox - Contenus internet
      Response.aggregate(pipeline('Q15')),         // radio - Info fausse reçue

      // Section 4
      Response.aggregate(pipeline('Q16')),         // radio - Facilité parler
      Response.aggregate(pipeline('Q17', true)),   // checkbox - Freins
      Response.aggregate(pipeline('Q18')),         // radio - Sujets jamais abordés
      Response.aggregate(pipeline('Q19')),         // radio - Endroit adapté connu

      // Section 5
      Response.aggregate(pipeline('Q20')),         // radio - Utiliserait une app
      Response.aggregate(pipeline('Q21', true)),   // checkbox - Format info
      Response.aggregate(pipeline('Q22')),         // radio - Langue préférée
      Response.aggregate(pipeline('Q23')),         // radio - Canal d'accès
      Response.aggregate(pipeline('Q24')),         // radio - Fréquence d'utilisation

      // Section 6
      Response.aggregate(pipeline('Q25')),         // radio - Utilité module anonyme
      Response.aggregate(pipeline('Q26')),         // radio - Confiance répondant
      Response.aggregate(pipeline('Q27')),         // radio - Délai réponse
      Response.aggregate(pipeline('Q28', true)),   // checkbox - Conditions acceptées

      // Section 7
      Response.aggregate(pipeline('Q29', true)),   // checkbox - Inquiétudes
      Response.aggregate(avg('Q30')),              // scale 1-5 - Confiance plateforme
      Response.aggregate(pipeline('Q31', true)),   // checkbox - Acteurs promotion

      // Section 8
      Response.aggregate(pipeline('Q32')),         // radio - Type téléphone
      Response.aggregate(pipeline('Q33')),         // radio - Mode connexion
      Response.aggregate(pipeline('Q34')),         // radio - Temps écran
      Response.aggregate(pipeline('Q35', true)),   // checkbox - Réseaux sociaux

      // Section 10
      Response.aggregate(pipeline('Q40')),         // radio - Participer aux tests
    ]);

    // Timeline des soumissions
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
      // Section 1 - Toi en quelques mots
      profil: { Q1, Q2, Q3, Q4, Q5, Q6 },
      // Section 2 - Ce que tu sais déjà sur la santé reproductive
      connaissances: { Q7, Q8, Q9: Q9avg[0] || null, Q10 },
      // Section 3 - Où vas-tu chercher tes informations
      sources: { Q11, Q14, Q15 },
      // Section 4 - Ce qui est difficile à aborder
      freins: { Q16, Q17, Q18, Q19 },
      // Section 5 - Ce que tu attendrais d'une plateforme comme FAGARU
      attentes: { Q20, Q21, Q22, Q23, Q24 },
      // Section 6 - Module « Pose ta question » anonyme
      moduleAnonyme: { Q25, Q26, Q27, Q28 },
      // Section 7 - Confiance et confidentialité
      confiance: { Q29, Q30: Q30avg[0] || null, Q31 },
      // Section 8 - Ton accès au numérique
      numerique: { Q32, Q33, Q34, Q35 },
      // Section 10 - Et après ?
      engagement: { Q40 }
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
      Response.find({}, '-Q40_contact -metadata.ip').sort({ createdAt: -1 }).skip(skip).limit(limit),
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
    const response = await Response.findById(req.params.id, '-Q40_contact -metadata.ip');
    if (!response) return res.status(404).json({ success: false, error: 'Response not found' });
    res.json({ response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};