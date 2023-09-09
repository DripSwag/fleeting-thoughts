import { Router } from 'express'
import { ThoughtUser } from '../controllers/thought'

const verifyRouter = Router()

verifyRouter.get('/thought', ThoughtUser)

export default verifyRouter
