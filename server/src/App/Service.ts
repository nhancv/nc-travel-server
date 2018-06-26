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

const getTeamInfo = (teamId: string) => {
  if (teams.hasOwnProperty(teamId)) {
    return teams[teamId]
  }
  return codes['10']
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

const resetMemberLock = (memberId: string) => {
  if (members.hasOwnProperty(memberId)) {
    members[memberId].loged = false
    return codes['20']
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

export const server = { checkAllTaskCompleted, getTeamInfo, resetMemberLock }
export const client = { memberLogin, memberGetNext, memberCheckin }
