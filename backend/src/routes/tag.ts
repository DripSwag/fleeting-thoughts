import { Router } from 'express'
import * as controller from '../controllers/tag'

const tagRouter = Router()

tagRouter.get('/thought/:id', controller.getThought)
tagRouter.patch('/', controller.put)
tagRouter.delete('/', controller.del)
tagRouter.post('/', controller.post)

export default tagRouter
