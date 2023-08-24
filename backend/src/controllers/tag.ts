import { Request, Response } from 'express'
import * as services from '../services/tag'

interface UrlParams {
  id: string
}

export async function getThought(
  req: Request<any, any, any, UrlParams>,
  res: Response,
) {
  const response = await services.getThoughtTags(parseInt(req.params.id))
  if (response !== undefined) {
    res.json(response)
  } else {
    res.status(204).end()
  }
}

interface putBody {
  id: number
  name: string
}

export async function put(req: Request, res: Response) {
  const body: putBody = req.body
  const response = await services.put(body.id, body.name)
  if (response !== undefined) {
    res.json(response)
  } else {
    res.status(201).end()
  }
}

interface deleteBody {
  id: number
}

//delete is reservered by something
export async function del(req: Request, res: Response) {
  const body: deleteBody = req.body
  try {
    const response = await services.del(body.id)
    res.json(response)
  } catch (e) {
    res.status(204).end()
  }
}

interface postBody {
  name: string
  userId: number
  thoughtId: number
}

interface NewTag {
  name: string
  thoughtTags: Array<{ id: number }>
}

interface Tag {
  id: number
  tag: { name: string }
}

export async function post(req: Request, res: Response) {
  const body: postBody = req.body
  try {
    const response: NewTag = await services.post(
      body.name,
      body.userId,
      body.thoughtId,
    )
    const parsedResponse: Tag = {
      id: response.thoughtTags[0].id,
      tag: { name: response.name },
    }
    res.json(parsedResponse)
  } catch (e) {
    res.status(400).end()
  }
}
