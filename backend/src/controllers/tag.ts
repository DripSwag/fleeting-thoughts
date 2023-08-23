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
