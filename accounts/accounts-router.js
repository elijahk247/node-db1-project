const db = require("../data/dbConfig.js");

const express = require('express');
const router = express.Router();

// GET request 
router.get('/', (req, res) => {
  db.select('*').from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: error.message });
    })
})



// GET request by ID
router.get('/:id', validateID, (req, res) => {
  db('accounts').where('id', '=', req.params.id)
    .then(account => {
      res.status(200).json({ data: account });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: errorMessage });
    })
})

// POST request
router.post('/', validateContent, (req, res) => {
  db('account').insert
})

// PUT request
router.put('./:id', validateID, validateContent, (req, res) => {
  db('accounts').where({ id: req.params.id }).change(req.body)
    .then(count => {
      db('accounts').where({ id: req.params.id })
        .then(account => {
          res.status(200).json({ updated: count, user: account });
        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: error.message });
    })
})

// DELETE request
router.delete('/:id', validateID, (req, res) => {
  db('account').where({  id: req.params.id }).del()
    .then(count => {
      res.status(200).json({ removed: count });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: error.message });
    })
})

function validateID(req, res, next) {
  const id = req.params.id;
  const found = db.select('id').from('accounts');

  if (found) {
    console.log(found)
    next();
  } else {
    res.status(404).json({ message: 'Account with the provided ID could not be found' });
  }
}

function validateContent(req, res, next) {
  const data = req.body;
}

module.exports = router;