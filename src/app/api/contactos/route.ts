import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const contactos = await prisma.contactos.findMany();
        
        const safeData = contactos.map(c => ({
            ...c,
            id: c.id.toString(),
        }));

        return NextResponse.json(safeData);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            });
        }
    }
}

export async function POST(request: Request) {
    try {
        const { nombre, correo, telefono, estado } = await request.json();

        const newContacto = await prisma.contactos.create({
            data: {
                nombre,
                correo,
                telefono,
                estado,
            }
        });

        // Si tienes un BigInt en tu modelo, conviértelo a string
        return NextResponse.json({
            ...newContacto,
            id: newContacto.id.toString(),
        });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
}


