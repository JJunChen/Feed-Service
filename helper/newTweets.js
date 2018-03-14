const express = require('express');

const router = express.Router();
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['18.144.21.184'] });
client.connect((err, result) => {
  console.log('cassandra connected');
});

const editFeedByUserId = 'UPDATE feedservice.feed SET tweets = tweets + ? WHERE user_id = ?';

router.post('/', (req, res) => {
  const { users, tweet } = req.body;
  const queries = [];
  for (let i = 0; i < users.length; i += 1) {
    queries.push({ query: editFeedByUserId, params: [[tweet], users[i]] });
  }
  client
    .batch(queries, { prepare: true })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => console.log('error occured', err));
});

module.exports = router;
