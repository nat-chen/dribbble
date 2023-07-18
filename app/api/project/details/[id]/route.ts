import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const project = await prisma.project.findFirst({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ success: true, data: project }, { status: 200 });
}
