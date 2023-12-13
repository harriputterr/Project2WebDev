import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, {params}: {params: { id: string}}) {
  const {id} = params;
  const cartWithItems = await prisma.cart.findUnique({
    where: {
      userId: id,
    },
    include: {
      cartItems: {
        include: {
          item: true,
        },
      },
    },
  });

  return NextResponse.json(cartWithItems, { status: 200 });
}


// This method edits the quantity
export async function PATCH(request: Request, {params}: {params: {id:string}}){
  const {id} = params;
  const { quantity } = await request.json();
  console.log("This is the quantity that is going to be updated to the DB", quantity);
  // Update the movie with the given Id from the database
  
  const cartItem = await prisma.cartItem.update({
      where: {
          id: id
      },
      data: {
          quantity: quantity
      }
  });
  return NextResponse.json(cartItem, {status: 200});
}


// Deleting the Cart Item from the DB
export async function DELETE(request: Request, {params}: {params: {id:string}}){
  const { id } = params;

  const book = await prisma.cartItem.delete({
      where: {
          id: id
      }
  });

  return NextResponse.json("Deleted", { status: 200});
}