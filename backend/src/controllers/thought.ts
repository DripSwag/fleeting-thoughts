import { Request, Response } from 'express'
import * as services from '../services/thought'

interface UrlParams {
  userId: string
  tags: string | undefined
}

export async function getUser(
  req: Request<any, any, any, UrlParams>,
  res: Response,
) {
  const tags = req.query.tags?.split(',') || undefined
  const response = await services.getUsersThoughts(
    parseInt(req.params.userId),
    tags,
  )
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
  userId: number
}

export async function post(req: Request, res: Response) {
  const body: PostBody = req.body
  const response = await services.post(body.userId)
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

interface PatchBody {
  id: number
  title: string
}

export async function patch(req: Request, res: Response) {
  const body: PatchBody = req.body
  const response = await services.patch(body.id, body.title)
  if (response) {
    res.json(response)
  } else {
    res.status(400).end()
  }
}

interface DeleteRequest {
  id: string
}

export async function del(
  req: Request<any, any, any, DeleteRequest>,
  res: Response,
) {
  console.log(parseInt(req.params.id))
  const response = await services.del(parseInt(req.params.id))
  if (response) {
    res.json(response)
  } else {
    res.status(400).end()
  }
}
