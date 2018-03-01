const getRandom = require('./getRandom')
const { getCafeteriaMessage, cafeteriaKeyboard } = require('./getCafeteriaMenu')


const getMessage = async (content) => {
  switch (content) {
    case '식당 추천':
      return await getRandom()
    case '학식':
      return cafeteriaKeyboard
    case '인문관 점심':
    case '인문관 저녁':
    case '교수회관 점심':
    case '교수회관 저녁':
      return await getCafeteriaMessage(content)
  }
}

module.exports = getMessage
