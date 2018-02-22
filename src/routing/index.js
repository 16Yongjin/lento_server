const router = require('koa-router')()
const user = require('api/users/routes')
const food = require('api/foods/routes')
const kakao = require('api/kakao/routes')

router.use('/foods', food)

router.use('/users', user)

router.use('/kakao', kakao)

module.exports = router
