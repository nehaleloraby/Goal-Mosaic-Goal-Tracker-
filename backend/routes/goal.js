const express = require('express')
const router = express.Router()
const goalController = require('../controllers/goalController')

// Goal routes
router.get('/', goalController.home)
router.get('/add', goalController.addGoal)
router.post('/add', goalController.postGoal)
router.get('/view/:id', goalController.view)
router.get('/edit/:id', goalController.edit)
router.put('/edit/:id', goalController.editPost)
router.delete('/edit/:id', goalController.deleteGoal)

module.exports = router