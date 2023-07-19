import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const { category, ...rest } = payload;
  const project = await prisma.project.update({
    where: {
      id: rest.id,
    },
    data: {
      ...rest,
      category: {
        connect: { id: category.id },
      },
    },
  });
  return NextResponse.json({ success: true, data: project }, { status: 200 });
}
