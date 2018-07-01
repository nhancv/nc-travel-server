import { Code, NextRes, IService } from '../'

export default class DemoService implements IService {
  private connection

  constructor() {
    const mysql = require('mysql')
    this.connection = mysql.createConnection({
      host: '192.168.64.3',
      user: 'nhancv',
      password: '',
      database: 'travel'
    })
  }
  initData = () => {
    return new Promise((resolve, reject) => {
      this.connection.connect(function(err) {
        if (err) throw err
        console.log('DB Connected!')
        resolve()
      })
    })
  }

  memberLogin(memberId: string): Code {
    //implement here
    return Code.ERROR
  }

  memberGetNext(memberId: string): Code {
    //implement here
    return Code.ERROR
  }
  memberCheckin(memberId: string, taskPoint: string): Code {
    //implement here
    return Code.ERROR
  }
}
