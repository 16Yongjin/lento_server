import * as request from 'request-promise'
import * as moment from 'moment'
import * as cheerio from 'cheerio'
import keyboard from './keyboard'

const matchAll = (re: RegExp) => (menu: string) => {
  let match
  const matchList = []
  // tslint:disable-next-line
  while ((match = re.exec(menu)) !== null) {
    matchList.push(match)
  }
  return matchList
}

const getCafeteriaMenu = async (message: string): Promise<string> => {
  const [place, eatingTime] = message.split(' ')
  const today = moment().add(5, 'h')
  const YYYYMMDD = today.format('YYYYMMDD')
  const url = `https://webs.hufs.ac.kr/jsp/HUFS/cafeteria/viewWeek.jsp?startDt=${YYYYMMDD}&endDt=${YYYYMMDD}&`
        + (place === '인문관' ? '&caf_id=h101' : '&caf_id=h102')
  const re = eatingTime === '점심' ? /중식.+?\d+원/g : /석식.+?\d+원/g
  try {
    // tslint:disable-next-line
    const html = await request(url)
    const $ = cheerio.load(html)
    let menu = $('table').text().replace(/\s+/g, ' ')
    const result = matchAll(re)(menu).map(match => {
      return match[0]
        .replace(' Kcal', 'Kcal')
        .replace(/\s+/g, '\n')
        .replace(/(\d{2})(\d{2}~\d{2})(\d{2})/g, ' $1:$2:$3\n')
        .replace('Kcal', ' Kcal')
    })
    result.unshift(today.format('M월 D일'))
    return result.join('\n\n') || '오늘은 밥 안 나와요'
  } catch (e) {
    console.log(e)
    return '학식 가져오기에 실패했습니다.'
  }
}

export const getCafeteriaMessage = async (content: string): Promise<object> => {
  const text = await getCafeteriaMenu(content)
  return { message: { text }, keyboard }
}

export const cafeteriaKeyboard = {
  message: {
    'text': '고르세요.'
  },
  keyboard: {
    'type' : 'buttons',
    'buttons' : ['인문관 점심', '인문관 저녁', '교수회관 점심', '교수회관 저녁']
  }
}
