
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request){
    try{
        // Here we are taking in the data from frontend and converting it into json.
        const body = await req.json();

        // Desstructuring the data.
        const {userId, itemId, quantity } = body;

        // Find or create a cart for the user.
        let cart = await prisma.cart.findUnique({ where: { userId: userId}});

        // If there is not cart, we will create one :)
        if (!cart){
            cart = await prisma.cart.create({
                data: { userId: userId},
            });
        }

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                itemId: itemId,
            },
        });

        if (existingCartItem){

            await prisma.cartItem.update({
                where: { id: existingCartItem.id},
                data: { quantity: existingCartItem.quantity + quantity},
            });
        }
        else{
            // Add new Item to the Cart.
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    itemId: itemId,
                    quantity: quantity,
                },
            });
        }

        return NextResponse.json({ status: 201});
    }
    catch(error){
        console.log(error);
    }
}

