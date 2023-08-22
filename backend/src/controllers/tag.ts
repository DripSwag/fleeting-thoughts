import { Request, Response } from 'express'
import * as services from '../services/tag'

interface UrlParams {
  id: string
}

export async function getUser(
  req: Request<any, any, any, UrlParams>,
  res: Response,
) {
  console.log(parseInt(req.params.id))
  const response = await services.getThoughtTags(parseInt(req.params.id))
  console.log(response)
  if (response !== undefined) {
    res.json(response)
  } else {
    res.status(204).end()
  }
}
