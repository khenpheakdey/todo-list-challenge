import { db } from "@/lib/config/firebase-config";
import { TODO_COLLECTION } from "@/lib/constants";
import { todos } from "@/lib/data/todos";
import { todoCreateSchema } from "@/lib/validations/todo";
import { Todo } from "@/types/todo";
import { getCurrentDate } from "@/utils/date-time";
import { generateUUID } from "@/utils/uuid";
import { addDoc, collection } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import * as z from "zod";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = todoCreateSchema.parse(json);

    const collectionRef = collection(db, TODO_COLLECTION);

    await addDoc(collectionRef, {
      id: generateUUID(),
      todo: body.todo,
      isCompleted: body.isCompleted || false,
      createdAt: body.createdAt ?? getCurrentDate(),
    });

    return new NextResponse(JSON.stringify("success"));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    console.log(error);
    return NextResponse.error();
  }
}
