import { Router } from 'express'
import * as controller from '../controllers/tag'
import * as middleware from '../middleware'

const tagRouter = Router()

tagRouter.use('/', (req, res, next) => {
  middleware.SsidCheck(req, res, next)
})

tagRouter.get('/thought/:id', controller.getThought)
tagRouter.patch('/', controller.put)
tagRouter.delete('/', controller.del)
tagRouter.post('/', controller.post)

export default tagRouter
