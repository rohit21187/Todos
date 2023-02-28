const express = require('express')
const control1= require('../controllers/tasks.controller')

const router= express.Router()

router.get('/',control1.create)
router.post('/',control1.readAll)
router.delete('/',control1.delete)

module.exports = router