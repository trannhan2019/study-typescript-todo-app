import { todoAddSchema } from "@/validation/todo";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = todoAddSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.format() },
        { status: 400 }
      );
    }

    const { title } = body;
    const todo = await prisma.todo.create({
      data: {
        title,
      },
    });
    return NextResponse.json(todo, {
      status: 201,
    });
  } catch (error) {
    console.log("Error while Registeing", error);
    return NextResponse.json(
      { message: "Error Occured While Registering the user." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos, {
      status: 200,
    });
  } catch (error) {
    console.log("Error while get todos", error);
    return NextResponse.json({ message: "Get todos errors" }, { status: 500 });
  }
}
