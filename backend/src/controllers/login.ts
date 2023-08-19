import { Request, Response } from "express";
import { getUser } from "../services/login";

export async function put(req: Request, res: Response) {
  try {
    const user = await getUser("test", "test");
    res.json(user);
  } catch {
    res.json({ message: "error" });
  }
}

export function post(req: Request, res: Response) {
  console.log(req.body);
  res.json(req.body);
}
