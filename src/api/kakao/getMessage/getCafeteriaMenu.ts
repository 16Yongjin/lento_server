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

const getCafeteria = async (message: string): Promise<Array<string>> => {
  const [place, eatingTime] = message.split(' ')
  const YYYYMMDD = moment().add(5, 'h').format('YYYYMMDD')
  const url = `https://webs.hufs.ac.kr/jsp/HUFS/cafeteria/viewWeek.jsp?startDt=${YYYYMMDD}&endDt=${YYYYMMDD}&`
        + (place === '인문관' ? '&caf_id=h101' : '&caf_id=h102')
  const re = eatingTime === '점심' ? /중식.+?\d+원/g : /석식.+?\d+원/g
  try {
    const html = await request(url)
    const $ = cheerio.load(html)
    let menu = $('table').text().replace(/\s+/g, ' ').replace(
      '중식(2)1100~1430 외국어로 메뉴를 알기 원하시면 구글앱 hfspn 또는 웹사이트 www.hfspn.co 에서 확인하실 수 있습니다.','')
      .replace('석식1640~1840 기타 식당관련 건의사항은 hfspn 게시판을 이용하시면 됩니다.', '')
    return matchAll(re)(menu).map(match => {
      return match[0]
        .replace(' Kcal', 'Kcal')
        .replace(/\s+/g, '\n')
        .replace(/(\d{2})(\d{2}~\d{2})(\d{2})/g, ' $1:$2:$3\n')
        .replace('Kcal', ' Kcal')
    })
  } catch (e) {
    return []
  }
}

export const getCafeteriaObj = async (message: string): Promise<Object> => {
  const day = moment().format('D') === moment().add(5, 'h').format('D') ? '오늘' : '내일'
  const menus = await getCafeteria(message)

  return { day, menus }
}

const getCafeteriaMenu = async (message: string): Promise<string> => {
  const day = moment().format('D') === moment().add(5, 'h').format('D') ? '오늘' : '내일'
  const menus = await getCafeteria(message)

  menus.length > 0 && menus.unshift(day + ' ' + message)
  return menus.join('\n\n') || '오늘은 밥 안 나와요'
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
