import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function POST(request: Request){
    const body = await request.json();
    console.log(body);
    const { name, category, description, color, price, listImageUrl } = body;
    const post = await prisma.item.create({
        data: {
            name,
            category,
            description,
            color, 
            price,
            listImageUrl,
        },
    });

    return NextResponse.json(post, {status: 201});
}

