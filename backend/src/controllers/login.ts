import { Request, Response } from "express";
import { createUser } from "../services/login";

interface PostBody {
  username: string;
  password: string;
}

export async function put(req: Request, res: Response) {
  try {
    console.log(req.body);
    res.json("login");
  } catch {
    res.json({ message: "error" });
  }
}

export async function post(req: Request, res: Response) {
  const body: PostBody = req.body;
  const response = await createUser(body.username, body.password);
  res.json(response);
}
