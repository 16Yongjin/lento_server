import * as _ from 'lodash'
import * as fs from 'mz/fs'

export const getLogs = async () => {
  const raw = await fs.readFile('./access.log', 'utf-8')
  const logs = raw.trim()
    .replace(/"/g, '')
    .split('\n')
    .map(log => log.split(/ +/))
    .slice(0)
    .map(log => {
      const time = log[3].substr(1).split(/\/|:/)
      const [day, month] = time
      const date = `${day} ${month}`
      const method = log[5]
      const url = log[6]
      const status = log[8]
      const userAgent = log.slice(11).join(' ')
      const urlGroup = url.split('/').slice(0, 3).join('/')
      return { time, date, method, urlGroup, status, userAgent }
    })
  return logs
}

export const countLogs = () => getLogs().then(logs => ({ date: _.countBy(logs, 'date'), url: _.countBy(logs, 'urlGroup') }))
