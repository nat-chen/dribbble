import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const { category, ...rest } = payload;
  const project = await prisma.project.create({
    data: {
      ...rest,
      user: {
        connect: { id: "31d77e16-9f4d-4aaf-9240-ad9b5557e412" },
      },
      category: {
        connect: { id: "5ce14ac6-f631-4467-8fc8-f85ba8f57723" },
      },
    },
  });
  return NextResponse.json({ success: true, data: project }, { status: 200 });
}
