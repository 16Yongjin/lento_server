const router = require('koa-router')()
const auth = require('api/auth/routes')
const food = require('api/foods/routes')
const kakao = require('api/kakao/routes')
const publicR = require('api/public/routes')
const users = require('api/users/routes')
const docs = require('api/docs/routes')

router.use('/docs', docs)

router.use('/public', publicR)

router.use('/users', users)

router.use('/auth', auth)

router.use('/foods', food)

router.use('/kakao', kakao)

module.exports = router
