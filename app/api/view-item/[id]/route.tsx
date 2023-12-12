import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, {params}: {params: {id:string}}){
  const {id} = params;

   // Get the movie with the given id from the database.
   const movie = await prisma.item.findUnique({
      where: {
          id: id
      }
   });
   return NextResponse.json(movie, { status: 200});
}
