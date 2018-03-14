const express = require('express');
// const faker = require('faker');
const uniqid = require('uniqid');
const cassandra = require('cassandra-driver');

const router = express.Router();

const client = new cassandra.Client({ contactPoints: ['18.144.21.184'] });

client.connect((err, result) => {
  console.log('cassandra connected');
});

let number = 1210166;

const createFeed = (ct, queries) => {
  const tweets = [];
  for (let j = 0; j < 10; j += 1) {
    const tweet = {
      tweet_id: uniqid(),
      isad: Math.random() < 0.3,
    };
    tweets.push(tweet);
  }
  const query = 'INSERT INTO feedservice.feed (user_id, tweets) VALUES (?, ?)';
  queries.push({ query, params: [number, tweets] });
  number += 1;
};

const createData = (client, counter = 0) => {
  const queries = [];
  for (let i = 0; i < 5; i += 1) {
    createFeed(i, queries);
  }
  client
    .batch(queries, { prepare: true })
    .then(() => {
      counter += 5;
      console.log(counter);
      if (counter < 10000000) {
        createData(client, counter);
      }
    })
    .catch(error => console.log('error occur', error));
};

createData(client);

router.get('/createData', (req, res) => {});

module.exports = router;
