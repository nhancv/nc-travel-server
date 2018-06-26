const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '192.168.64.3',
  user: 'nhancv',
  password: '',
  database: "travel"
})

export {
  connection
}