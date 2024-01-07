const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

const mongoUrl = 'mongodb://localhost:30010'; 

router.get('/', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const database = client.db('todorarmetest');
    const music = database.collection('music');

    const search = req.query.search || '';
    const aggregationType = req.query.aggregation;
    let aggregationPipeline = [];

    if (search) {
      aggregationPipeline.push({ $match: { name: new RegExp(search, 'i') } });
    }

    if (aggregationType === 'sortByName') {
      aggregationPipeline.push({ $sort : { name : 1 } });
    } else if (aggregationType === 'sortByRank') {
      aggregationPipeline.push({ $sort : { classement : 1 } });
    }

    if (aggregationType === 'randomSample') {
      aggregationPipeline.push({ $sample: { size: 5 } });
    }

    const musicList = await music.aggregate(aggregationPipeline).toArray();
    res.status(200).json(musicList);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error connecting to the database' });
  } finally {
    await client.close();
  }
});

module.exports = router;
