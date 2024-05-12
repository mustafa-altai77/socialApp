const express = require('express')
const clientRoute = require('./client');

const router = express.Router()

const defaultRoutes = [
  { path: '/client', route: clientRoute },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
