import { Request, Response } from 'express'
import { createUser, login } from '../services/login'

interface PostBody {
  username: string
  password: string
}

export async function put(req: Request, res: Response) {
  try {
    const body: PostBody = req.body
    const response = await login(body.username, body.password)
    console.log(response)
    if (response) {
      res.status(200).json(response)
    } else {
      res.status(204).json('nothing')
    }
  } catch {
    res.json({ message: 'error' })
  }
}

export async function post(req: Request, res: Response) {
  const body: PostBody = req.body
  const response = await createUser(body.username, body.password)
  res.json(response)
}
