import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(request: any){
    const body = await request.json();
    console.log(body);
    const { name, email, password, isAdmin } = body.data;
    if(!name || !email || !password){
        return new NextResponse("Missing name, email or password", { status: 400});
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (exist){
        console.log("User already exists!");
        return new NextResponse("User already exists", { status:400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
            isAdmin
        }
    });
    return NextResponse.json(user);
}
