const express = require('express');
const router = express.Router();
const { admin, verifyToken } = require('../firebaseAdmin');

const db = admin.firestore();

router.get('/', verifyToken, async (req, res) => {
  try {
    const snapshot = await db
      .collection('recipes')
      .where('userId', '==', req.user.uid)
      .get();

    const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні рецептів' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.uid;
    data.timestamp = admin.firestore.Timestamp.now();

    const docRef = await db.collection('recipes').add(data);
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: 'Помилка при збереженні рецепта' });
  }
});

module.exports = router;
