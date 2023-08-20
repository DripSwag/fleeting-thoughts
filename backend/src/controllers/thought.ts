import { Request, Response } from 'express'
import { createThought, getThoughts } from '../services/thought'

interface PostBody {
  text: string
  userId: number
}

interface UrlParams {
  userId: string
}

export async function get(
  req: Request<any, any, any, UrlParams>,
  res: Response,
) {
  const response = await getThoughts(parseInt(req.params.userId))
  console.log(response)
  res.json('get')
}

export async function post(req: Request, res: Response) {
  const body: PostBody = req.body
  const response = await createThought(body.text, body.userId)
  console.log(response)
  if (response) {
    res.json(response)
  } else {
    res.status(400).json('bad')
  }
}
