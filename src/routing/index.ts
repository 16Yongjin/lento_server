import * as Router from 'koa-router'
import auth from 'api/auth/routes'
import food from 'api/foods/routes'
import kakao from 'api/kakao/routes'
import publicR from 'api/public/routes'
import users from 'api/users/routes'
import docs from 'api/docs/routes'

const router = new Router()

router.use('/docs', docs)

router.use('/public', publicR)

router.use('/users', users)

router.use('/auth', auth)

router.use('/foods', food)

router.use('/kakao', kakao)

export default router
