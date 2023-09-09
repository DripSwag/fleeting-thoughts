import { Router } from 'express'
import * as controller from '../controllers/thought'
import * as middleware from '../middleware'

const thoughtRouter = Router()

thoughtRouter.use('/', (req, res, next) => {
  middleware.SsidCheck(req, res, next)
})

thoughtRouter.get('/user/:userId', controller.getUser)
thoughtRouter.get('/:thoughtId', controller.getThought)
thoughtRouter.post('/', controller.post)
thoughtRouter.put('/', controller.put)
thoughtRouter.patch('/', controller.patch)
thoughtRouter.delete('/:id', controller.del)

export default thoughtRouter
