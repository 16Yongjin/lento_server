const request = require('request-promise')
const moment = require('moment')
const cheerio = require('cheerio')
const keyboard = require('./keyboard')

const matchAll = re => menu => {
  let match
  const match_list = []
  while (match = re.exec(menu)) {
    match_list.push(match)
  }
  return match_list
}

const getCafeteriaMenu = async (message) => {
  const [place, eatingTime] = message.split(' ')
  const today = moment().add(9, 'h').format('YYYYMMDD')
  const url = `https://webs.hufs.ac.kr/jsp/HUFS/cafeteria/viewWeek.jsp?startDt=${today}&endDt=${today}&`
        + (place === '인문관' ? '&caf_id=h101' : '&caf_id=h102')
  const re = eatingTime === '점심' ? /중식.+?\d+원/g : /석식.+?\d+원/g;
  try {
    const html = await request(url)
    const $ = cheerio.load(html)

    var menu = $('table').text().replace(/\s+/g, ' ');
    return matchAll(re)(menu).map(match => {
      return match[0]
        .replace(' Kcal', 'Kcal')
        .replace(/\s+/g, '\n')
        .replace(/(\d{2})(\d{2}~\d{2})(\d{2})/g, ' $1:$2:$3\n')
        .replace('Kcal', ' Kcal')
    })
    .join('\n\n') || '오늘은 밥 안 나와요'
  } catch (e) {
    return '학식 가져오기에 실패했습니다.'
  }
}

const getCafeteriaMessage = async (content) => {
  const text = await getCafeteriaMenu(content)
  return { message: { text }, keyboard }
}


const cafeteriaKeyboard = {
  message: {
    'text': '고르세요.'
  },
  keyboard: {
    "type" : "buttons",
    "buttons" : ["인문관 점심", "인문관 저녁", "교수회관 점심", "교수회관 저녁"]
  }
}

module.exports = { getCafeteriaMessage, cafeteriaKeyboard }
