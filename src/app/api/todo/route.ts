import { todos } from "@/lib/data/todos";
import type { NextApiRequest, NextApiResponse } from "next";

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(todos);
}
