import Code from '../Models/Code'

export default interface IService {
  memberLogin(memberId: string): Code
  memberGetNext(memberId: string): Code
  memberCheckin(memberId: string, taskPoint: string): Code
}
