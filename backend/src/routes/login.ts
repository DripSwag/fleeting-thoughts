import { Router } from 'express'
import * as controller from '../controllers/login'

const loginRouter = Router()

loginRouter.put('/', controller.put)
loginRouter.post('/', controller.post)

export default loginRouter
