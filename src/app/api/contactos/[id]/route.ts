import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";


export async function GET(request: Request, context: { params: Promise<{ id: string }> } 
) {
    try {
        const { id } = await context.params; 

        const contacto = await prisma.contactos.findFirst({
            where: {
                id: BigInt(id),
            },
        });

        console.log(contacto);
        

        if (!contacto) {
            return NextResponse.json(
                { message: "Contacto no encontrado" },
                { status: 404 }
            );
        }

        const safeContacto = {
            ...contacto,
            id: contacto.id.toString(),
        };

        return NextResponse.json(safeContacto);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> } ) {
    try {
        const { id } = await context.params; 

        const contactoEliminado = await prisma.contactos.delete({
            where: {
                id: Number(id)
            }
        }) 

        if (!contactoEliminado)
            return NextResponse.json({
        message: 'Contacto no encontrado'}, {status: 404})

        return NextResponse.json(contactoEliminado);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if(error.code == "P2025") 
                return NextResponse.json({
            message: "Contacto no encontrado"}, {status: 404})

            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            });
        }
    }
}

export async function PUT(
    request: Request, 
    context: { params: Promise<{ id: string }> } 
) {
    try {
        const { id } = await context.params; 
        const { nombre, correo, telefono, estado } = await request.json();
        
        const contactoActualizado = await prisma.contactos.update({
            where: {
                id: BigInt(id)
            },
            data: {
                nombre,
                correo,
                telefono,
                estado
            }
        });

        const safeContacto = {
            ...contactoActualizado,
            id: contactoActualizado.id.toString(),
        };

        return NextResponse.json(safeContacto);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json({
                    message: "Contacto no encontrado"
                }, { status: 404 });
            }
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            });
        }
    }
}


