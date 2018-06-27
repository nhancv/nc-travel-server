import Code from './Code'

export default class NextRes extends Code {
  taskName: string | undefined
  taskDescription: string | undefined

  static WAITING(taskName: string, taskDescription: string): NextRes {
    return {
      code: 99,
      message: 'Wait for all team member checkin',
      taskName: taskName,
      taskDescription: taskDescription
    }
  }

  static CHECKIN(taskName: string, taskDescription: string): NextRes {
    return {
      code: 98,
      message: 'Checkin',
      taskName: taskName,
      taskDescription: taskDescription
    }
  }
}
