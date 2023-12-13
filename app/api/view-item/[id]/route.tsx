import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, {params}: {params: {id:string}}){
  const {id} = params;

   const item = await prisma.item.findUnique({
      where: {
          id: id
      }
   });
   return NextResponse.json(item, { status: 200});
}
