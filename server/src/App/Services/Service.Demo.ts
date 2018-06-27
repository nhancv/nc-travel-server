import { Code, NextRes, IService } from '../'
import { teams, members, tasks } from '../Models/Model.Demo'

export default class DemoService implements IService {
  //#region private method
  private checkAllMemberCheckin = (memberId: string): boolean => {
    if (members.hasOwnProperty(memberId)) {
      let mem = members[memberId]
      for (let m in members) {
        if (members[m].team == mem.team && !members[m].checkin) return false
      }
      return true
    }
    return false
  }

  private checkAllTaskCompleted = (teamId: string): boolean => {
    if (teams.hasOwnProperty(teamId)) {
      let tasks = teams[teamId].tasks
      for (let task in tasks) {
        if (!tasks[task]) return false
      }
      return true
    }
    return false
  }

  private resetAllMemberCheckin = (memberId: string): void => {
    if (members.hasOwnProperty(memberId)) {
      let mem = members[memberId]
      for (let m in members) {
        if (members[m].team == mem.team) members[m].checkin = false
      }
    }
  }

  private getNextTaskForTeam = team => {
    for (let task in team.tasks) {
      if (!team.tasks[task]) return task
    }
    return undefined
  }
  //#endregion

  memberLogin(memberId: string): Code {
    if (members.hasOwnProperty(memberId) && !members[memberId].loged) {
      members[memberId].loged = true
      return Code.SUCCESS
    }
    return Code.ERROR
  }

  memberGetNext(memberId: string): Code {
    if (members.hasOwnProperty(memberId) && teams.hasOwnProperty(members[memberId].team) && members[memberId].loged) {
      let mem = members[memberId]
      let team = { ...teams[mem.team], id: mem.team }
      //Check team are completed all tasks
      if (this.checkAllTaskCompleted(team.id)) {
        return Code.COMPLETE
      } else {
        //Check member status
        let taskPoint = team.taskPoint
        let taskInfo = tasks[taskPoint]
        if (!mem.checkin) {
          return NextRes.CHECKIN(taskInfo.taskName, taskInfo.taskDescription)
        } else {
          return NextRes.WAITING(taskInfo.taskName, taskInfo.taskDescription)
        }
      }
    }
    return Code.ERROR
  }
  memberCheckin(memberId: string, taskPoint: string): Code {
    if (members.hasOwnProperty(memberId) && teams.hasOwnProperty(members[memberId].team) && members[memberId].loged) {
      members[memberId].checkin = true

      let mem = members[memberId]
      let team = teams[mem.team]
      //Check taskPoint is match
      if (taskPoint != team.taskPoint) return Code.ERROR

      //Check if last member present
      if (this.checkAllMemberCheckin(memberId)) {
        //Go to next task
        team.tasks[taskPoint] = true
        team.taskPoint = this.getNextTaskForTeam(team)
        //Reset checkin status
        this.resetAllMemberCheckin(memberId)
      }
      return Code.SUCCESS
    }
    return Code.ERROR
  }
}
