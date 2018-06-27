export default class Code {
  code: number
  message: string

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }

  static ERROR: Code = {
    code: 10,
    message: 'Error'
  }

  static SUCCESS: Code = {
    code: 20,
    message: 'Successful'
  }

  static COMPLETE: Code = {
    code: 100,
    message: 'Congratulation!'
  }
}
