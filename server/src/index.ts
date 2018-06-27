const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const log = console.log
var port = process.env.PORT || 4000

// Body parser: https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// CORS on ExpressJS: https://github.com/expressjs/cors
app.use(cors())
// Cookie parser: https://github.com/expressjs/cookie-parser
app.use(cookieParser())

// For fontend route
var frontendDir = path.join(path.dirname(path.dirname(__dirname)), 'frontend')
app.use('/home', express.static(path.join(frontendDir, 'build')))
app.get('/home', function(req, res) {
  res.sendFile(path.join(frontendDir, 'build', 'index.html'))
})
app.get('/', function(req, res) {
  res.redirect('/home')
})

app.listen(port, function() {
  log('Server listening at port %d', port)
})

import {IService, DemoService} from './App'
let service: IService = new DemoService()

/**
 * Test
 */
// let memberId = '001'
// let memberId2 = '002'
// let taskPoint = '001'
// let taskPoint2 = '002'
// console.log(service.memberLogin(memberId))
// console.log(service.memberGetNext(memberId))
// console.log(service.memberCheckin(memberId, taskPoint))
// console.log(service.memberLogin(memberId2))
// console.log(service.memberGetNext(memberId))
// console.log(service.memberCheckin(memberId2, taskPoint))
// console.log(service.memberGetNext(memberId))
// console.log(service.memberGetNext(memberId2))
// console.log(service.memberCheckin(memberId, taskPoint2))
// console.log(service.memberCheckin(memberId2, taskPoint2))
// console.log(service.memberGetNext(memberId))
// console.log(service.memberGetNext(memberId2))


app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.post('/login', function(req, res) {
  console.log('login', req.body)
  let memberId = req.body.memberId
  res.json(service.memberLogin(memberId))
})

app.post('/getNext', function(req, res) {
  console.log('getNext', req.body)

  let memberId = req.body.memberId
  res.json(service.memberGetNext(memberId))
})

app.post('/checkIn', function(req, res) {
  console.log('checkIn', req.body)

  let memberId = req.body.memberId
  let taskPoint = req.body.taskPoint
  res.json(service.memberCheckin(memberId, taskPoint))
})

