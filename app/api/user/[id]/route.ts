import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
    include: {
      projects: true,
    },
  });
  return NextResponse.json({ success: true, data: user }, { status: 200 });
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const payload = await req.json();
  const user = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      ...payload,
    },
  });
  return NextResponse.json({ success: true, data: user }, { status: 200 });
}
