import { db } from "@/lib/config/firebase-config";
import { TODO_COLLECTION } from "@/lib/constants";
import { todoPatchSchema } from "@/lib/validations/todo";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    todoId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the todoId is valid.
    const docRef = doc(db, TODO_COLLECTION, params.todoId);
    const docSnap = await getDoc(docRef);

    // If the todoId is invalid, return a 404 response.
    if (!docSnap.exists()) {
      return new Response(`Todo ${params.todoId} not found`, { status: 404 });
    }

    // Delete the todo item.
    await deleteDoc(docRef);

    return new NextResponse(JSON.stringify("success"));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    console.log(error);
    return NextResponse.error();
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Validate the request body.
    const json = await req.json();
    const body = todoPatchSchema.parse(json);

    // Check if the todoId is valid.
    const docRef = doc(db, TODO_COLLECTION, params.todoId);
    const docSnap = await getDoc(docRef);

    // If the todoId is invalid, return a 404 response.
    if (!docSnap.exists()) {
      return new Response(`Todo ${params.todoId} not found`, { status: 404 });
    }

    // Update the todo item.
    await updateDoc(docRef, {
      todo: body.todo,
      isCompleted: body.isCompleted,
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
