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

const teams = {
  '001': {
    display: 'Team 1',
    tasks: {
      '001': false,
      '002': false
    },
    taskPoint: '001'
  }
}

const members = {
  '001': {
    loged: false,
    team: '001',
    name: 'NC',
    checkin: false
  },
  '002': {
    loged: false,
    team: '001',
    name: 'NC2',
    checkin: false
  }
}

const tasks = {
  '001': {
    taskName: 'Task 001',
    taskDescription: 'Task 001 description'
  },
  '002': {
    taskName: 'Task 002',
    taskDescription: 'Task 002 description'
  }
}


export { codes, teams, members, tasks }
