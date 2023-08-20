import { Router } from 'express'
import * as login from '../controllers/login'

const loginRouter = Router()

loginRouter.put('/', login.put)
loginRouter.post('/', login.post)

export default loginRouter
