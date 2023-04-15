const express = require('express')

const router = express.Router()

const itemControl = require('../controllers/itemController')

// seed 
router.get('/seed', itemControl.seed)

// index
router.get('/', itemControl.index)

// new
router.get('/new', itemControl.new)

// delete
router.delete('/:id', itemControl.delete)

// update
router.put('/:id', itemControl.update)

// create
router.post('/', itemControl.create)

// edit 
router.get('/:id/edit', itemControl.edit)

// show
router.get('/:id', itemControl.show)

module.exports = router