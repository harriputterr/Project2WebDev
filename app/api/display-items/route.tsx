import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(request: Request){
    // Get all Items from the database

    const items = await prisma.item.findMany();

    return NextResponse.json(items, { status: 200});
}
