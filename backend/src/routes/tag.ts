import { Router } from 'express'
import * as controller from '../controllers/tag'

const tagRouter = Router()

tagRouter.get('/thought/:id', controller.getThought)
tagRouter.patch('/', controller.put)

export default tagRouter
