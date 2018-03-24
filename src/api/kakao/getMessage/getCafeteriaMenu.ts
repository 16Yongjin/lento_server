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

const getDay = () => moment().days() === moment().add(5, 'h').days() ? '오늘' : '내일'

const cached: { [index: string]: { day: number, menus: Array<string>} } = {
  '인문관 점심': { day: null as number, menus: null as Array<string> },
  '인문관 저녁': { day: null as number, menus: null as Array<string> },
  '교수회관 점심': { day: null as number, menus: null as Array<string> },
  '교수회관 저녁': { day: null as number, menus: null as Array<string> }
}

const getCafeteria = async (message: string): Promise<Array<string>> => {
  const [place, eatingTime] = message.split(' ')
  const time = moment().add(5, 'h')
  const YYYYMMDD = time.format('YYYYMMDD')
  const day = time.days()

  if (cached[message] && cached[message].day === day) {
    console.log('return cached', message)
    return Promise.resolve(cached[message].menus.slice())
  }

  const url = `https://webs.hufs.ac.kr/jsp/HUFS/cafeteria/viewWeek.jsp?startDt=${YYYYMMDD}&endDt=${YYYYMMDD}&`
        + (place === '인문관' ? '&caf_id=h101' : '&caf_id=h102')
  const re = eatingTime === '점심' ? /중식.+?\d+원/g : /석식.+?\d+원/g
  try {
    // tslint:disable-next-line
    const html = await request(url)
    const $ = cheerio.load(html)
    let menu = $('table').text().replace(/\s+/g, ' ').replace(
      '중식(2)1100~1430 외국어로 메뉴를 알기 원하시면 구글앱 hfspn 또는 웹사이트 www.hfspn.co 에서 확인하실 수 있습니다.','')
      .replace('석식1640~1840 기타 식당관련 건의사항은 hfspn 게시판을 이용하시면 됩니다.', '')
    const menus = matchAll(re)(menu).map(match => {
      return match[0]
        .replace(' Kcal', 'Kcal')
        .replace(/\s+/g, '\n')
        .replace(/(\d{2})(\d{2}~\d{2})(\d{2})/g, ' $1:$2:$3\n')
        .replace('Kcal', ' Kcal')
    })

    Object.assign(cached[message], { day, menus })
    return menus.slice()
  } catch (e) {
    return []
  }
}

export const getCafeteriaObj = async (message: string): Promise<Object> => {
  const day = getDay()
  const menus = await getCafeteria(message)
  menus.length === 0 && menus.push(`${day}은 학식이 제공되지 않습니다.`)
  const [place, time] = message.split(' ')
  return { day, menus, place, time }
}

const getCafeteriaMenu = async (message: string): Promise<string> => {
  const day = getDay()
  const menus = await getCafeteria(message)

  menus.length > 0 && menus.unshift(day + ' ' + message)
  return menus.join('\n\n') || '오늘은 밥 안 나와요'
}

export const getCafeteriaMessage = async (content: string): Promise<object> => {
  const text = await getCafeteriaMenu(content)
  return { message: { text }, keyboard }
}

export const cafeteriaKeyboard = {
  message: { text: '고르세요.' },
  keyboard: {
    type : 'buttons',
    buttons : ['인문관 점심', '인문관 저녁', '교수회관 점심', '교수회관 저녁']
  }
}
