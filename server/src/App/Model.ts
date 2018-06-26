import { connection } from './Connection'

const codes = {
  '100': {
    code: 100,
    message: 'Congratulation!'
  },

  '98': {
    code: 98,
    message: 'Checkin'
  },

  '99': {
    code: 99,
    message: 'Wait for all team member checkin'
  },

  '10': {
    code: 10,
    message: 'Error'
  },

  '20': {
    code: 20,
    message: 'Successful'
  }
}

let teams, members, tasks

const initData = () => {
  return new Promise((resolve, reject) => {
    connection.connect(function(err) {
      if (err) throw err
      console.log('DB Connected!')

      connection.query('SELECT * FROM teams', function(err, result) {
        if (err) throw err
        console.log('Teams: ', result)
        for (let i in result) {
          connection.query(`SELECT * FROM team_task WHERE team = ${result[i].id}`, function(err, team_task) {
            if (err) throw err
            console.log('Teams - Tasks: ', team_task)
            //Update teams
            let team = result[i]
            let teamObj = {
              display: team.display,
              taskPoint: team.taskPoint
            }
          })
        }
      })

      /*
      connection.query('SELECT * FROM members', function(err, result) {
        if (err) throw err
        console.log('Result: ', result)
        //Update teams
      })

      connection.query('SELECT * FROM tasks', function(err, result) {
        if (err) throw err
        console.log('Result: ', result)
        //Update teams
      })

      //update
      var sql = "UPDATE teams SET taskPoint = 'Canyon 123' WHERE id = 'Valley 345'"
      connection.query(sql, function(err, result) {
        if (err) throw err
        console.log(result.affectedRows + ' record(s) updated')
      })
      */
    })
  })
}

export { initData, codes, teams, members, tasks }
