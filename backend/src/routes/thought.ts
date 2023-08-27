import { Router } from 'express'
import * as controller from '../controllers/thought'

const thoughtRouter = Router()

thoughtRouter.get('/user/:userId', controller.getUser)
thoughtRouter.get('/:thoughtId', controller.getThought)
thoughtRouter.post('/', controller.post)
thoughtRouter.put('/', controller.put)
thoughtRouter.patch('/', controller.patch)
thoughtRouter.delete('/:id', controller.del)

export default thoughtRouter
