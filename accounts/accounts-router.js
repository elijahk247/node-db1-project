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
      res.status(500).json({ error: 'Could not get the accounts' });
    })
})


// GET request by ID
router.get('/:id', validateID, (req, res) => {
  db('accounts').where('id', '=', req.params.id)
    .then(account => {
      res.status(200).json({ data: account });
    })
})

// POST request
router.post('/', validateContent, (req, res) => {
  db('accounts').insert(req.body, 'id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Could not post the new account' });
    })
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
      res.status(500).json({ error: 'Could not update the account' });
    })
})

// DELETE request
router.delete('/:id', validateID, (req, res) => {
  db('account').where({ id: req.params.id }).del()
    .then(count => {
      res.status(200).json({ removed: count });
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not delete the account' });
    })
})

function validateID(req, res, next) {
  const id = req.params.id;

  db('accounts').where({ id: id })
    .then(account => {
      if(account !=0) {
        next();
      } else {
        res.status(404).json({ message: 'Account at the given index could not be found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Account at the given index could not be retrieved' });
    })
}

function validateContent(req, res, next) {
  const data = req.body;

  if(data.name && data.budget) {
    next();
  } else {
    res.status(400).json({ message: 'Please provide a valid name and budget' });
  }
}

module.exports = router;