import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const payload = await req.json();
  const { category, ...rest } = payload;
  const session = await getServerSession(authOptions);
  const project = await prisma.project.create({
    data: {
      ...rest,
      user: {
        connect: { id: session?.user?.id },
      },
      category: {
        connect: { id: category.id },
      },
    },
  });
  return NextResponse.json({ success: true, data: project }, { status: 200 });
}
