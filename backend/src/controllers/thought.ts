import { Request, Response } from 'express'
import * as services from '../services/thought'

interface UrlParams {
  userId: string
}

export async function getUser(
  req: Request<any, any, any, UrlParams>,
  res: Response,
) {
  const response = await services.getUsersThoughts(parseInt(req.params.userId))
  if (response) {
    res.json(response)
  } else {
    res.status(204).end()
  }
}

interface UrlParams {
  thoughtId: string
}

export async function getThought(
  req: Request<any, any, any, UrlParams>,
  res: Response,
) {
  const response = await services.getThought(parseInt(req.params.thoughtId))
  if (response) {
    res.json(response)
  } else {
    res.status(204).end()
  }
}

interface PostBody {
  text: string
  userId: number
}

export async function post(req: Request, res: Response) {
  const body: PostBody = req.body
  const response = await services.createThought(body.text, body.userId)
  console.log(response)
  if (response) {
    res.json(response)
  } else {
    res.status(400).json('bad')
  }
}

interface PutBody {
  id: number
  text: string
}

export async function put(req: Request, res: Response) {
  const body: PutBody = req.body
  const response = await services.putThought(body.id, body.text)
  console.log(response)
  if (response) {
    res.json(response)
  } else {
    res.status(400).json('bad')
  }
}
