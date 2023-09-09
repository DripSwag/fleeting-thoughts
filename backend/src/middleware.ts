import { NextFunction, Request, Response } from 'express'
import * as services from './services/middleware'

export async function SsidCheck(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ssid = req.get('ssid')
  const userId = req.get('userId')
  if (ssid && userId) {
    const response = await services.ssid(ssid)
    if (response?.userId === parseInt(userId)) {
      next()
    } else {
      res.status(401).end()
      console.log('DENIED')
    }
  } else {
    res.status(401).end()
  }
}
