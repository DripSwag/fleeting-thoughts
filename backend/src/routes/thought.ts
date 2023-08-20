import { Router } from 'express'
import * as controller from '../controllers/thought'

const thoughtRouter = Router()

thoughtRouter.get('/:userId', controller.get)
thoughtRouter.post('/', controller.post)

export default thoughtRouter
