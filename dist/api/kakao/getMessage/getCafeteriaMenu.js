"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const moment = require("moment");
const cheerio = require("cheerio");
const keyboard_1 = require("./keyboard");
const matchAll = (re) => (menu) => {
    let match;
    const matchList = [];
    // tslint:disable-next-line
    while ((match = re.exec(menu)) !== null) {
        matchList.push(match);
    }
    return matchList;
};
const getCafeteriaMenu = async (message) => {
    const [place, eatingTime] = message.split(' ');
    const today = moment().add(5, 'h');
    const YYYYMMDD = today.format('YYYYMMDD');
    const url = `https://webs.hufs.ac.kr/jsp/HUFS/cafeteria/viewWeek.jsp?startDt=${YYYYMMDD}&endDt=${YYYYMMDD}&`
        + (place === '인문관' ? '&caf_id=h101' : '&caf_id=h102');
    const re = eatingTime === '점심' ? /중식.+?\d+원/g : /석식.+?\d+원/g;
    try {
        // tslint:disable-next-line
        const html = await request(url);
        const $ = cheerio.load(html);
        let menu = $('table').text().replace(/\s+/g, ' ').replace('중식(2)1100~1430 외국어로 메뉴를 알기 원하시면 구글앱 hfspn 또는 웹사이트 www.hfspn.co 에서 확인하실 수 있습니다.', '')
            .replace('석식1640~1840 기타 식당관련 건의사항은 hfspn 게시판을 이용하시면 됩니다.', '');
        const result = matchAll(re)(menu).map(match => {
            return match[0]
                .replace(' Kcal', 'Kcal')
                .replace(/\s+/g, '\n')
                .replace(/(\d{2})(\d{2}~\d{2})(\d{2})/g, ' $1:$2:$3\n')
                .replace('Kcal', ' Kcal');
        });
        result.unshift(today.format('M월 D일'));
        return result.join('\n\n') || '오늘은 밥 안 나와요';
    }
    catch (e) {
        console.log(e);
        return '학식 가져오기에 실패했습니다.';
    }
};
exports.getCafeteriaMessage = async (content) => {
    const text = await getCafeteriaMenu(content);
    return { message: { text }, keyboard: keyboard_1.default };
};
exports.cafeteriaKeyboard = {
    message: {
        'text': '고르세요.'
    },
    keyboard: {
        'type': 'buttons',
        'buttons': ['인문관 점심', '인문관 저녁', '교수회관 점심', '교수회관 저녁']
    }
};
//# sourceMappingURL=getCafeteriaMenu.js.map