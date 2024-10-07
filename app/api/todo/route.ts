import { todoAddSchema } from "@/validation/todo";
import prisma from "@/prisma/prismadb";
import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

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

export async function GET(request: NextRequest) {
  try {
    // const { searchParams } = new URL(request.url);
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;
    const take = limit;

    let where: any = {};
    if (search) {
      where = {
        title: {
          contains: search,
          mode: "insensitive",
        },
      };
    }

    const todos = await prisma.todo.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.todo.count({ where });
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      { todos, page, totalPages },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error while get todos", error);
    return NextResponse.json({ message: "Get todos errors" }, { status: 500 });
  }
}
