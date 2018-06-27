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



import { codes, teams, members, tasks } from './Model'

const checkAllTaskCompleted = (teamId: string) => {
  if (teams.hasOwnProperty(teamId)) {
    let tasks = teams[teamId].tasks
    for (let task in tasks) {
      if (!tasks[task]) return false
    }
    return true
  }
  return false
}

const memberLogin = (memberId: string) => {
  if (members.hasOwnProperty(memberId) && !members[memberId].loged) {
    members[memberId].loged = true
    return {...codes['20'], ...members[memberId]}
  }
  return codes['10']
}

const memberCheckin = (memberId: string, taskPoint: string) => {
  if (members.hasOwnProperty(memberId) && teams.hasOwnProperty(members[memberId].team) && members[memberId].loged) {
    members[memberId].checkin = true

    let mem = members[memberId]
    let team = teams[mem.team]
    //Check taskPoint is match
    if (taskPoint != team.taskPoint) return codes['10']

    //Check if last member present
    if (checkAllMemberCheckin(memberId)) {
      //Go to next task
      team.tasks[taskPoint] = true
      team.taskPoint = getNextTaskForTeam(team)
      //Reset checkin status
      resetAllMemberCheckin(memberId)
    }
    return codes['20']
  }
  return codes['10']
}

const memberGetNext = (memberId: string) => {
  if (members.hasOwnProperty(memberId) && teams.hasOwnProperty(members[memberId].team) && members[memberId].loged) {
    let mem = members[memberId]
    let team = { ...teams[mem.team], id: mem.team }
    //Check team are completed all tasks
    if (checkAllTaskCompleted(team.id)) {
      return codes['100']
    } else {
      //Check member status
      let taskPoint = team.taskPoint
      if (!mem.checkin) {
        return { ...codes['98'], ...tasks[taskPoint] }
      } else {
        return { ...codes['99'], ...tasks[taskPoint] }
      }
    }
  }
  return codes['10']
}

const checkAllMemberCheckin = (memberId: string) => {
  if (members.hasOwnProperty(memberId)) {
    let mem = members[memberId]
    for (let m in members) {
      if (members[m].team == mem.team && !members[m].checkin) return false
    }
    return true
  }
  return false
}

const resetAllMemberCheckin = (memberId: string) => {
  if (members.hasOwnProperty(memberId)) {
    let mem = members[memberId]
    for (let m in members) {
      if (members[m].team == mem.team) members[m].checkin = false
    }
  }
}

const getNextTaskForTeam = team => {
  for (let task in team.tasks) {
    if (!team.tasks[task]) return task
  }
  return undefined
}

export const client = { memberLogin, memberGetNext, memberCheckin }
