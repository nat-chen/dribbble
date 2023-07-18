import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("category");
  const filter = name ? { name } : {};
  const project = await prisma.project.findMany({
    where: {
      category: {
        ...filter,
      },
    },
    include: {
      user: true,
    },
  });
  return NextResponse.json({ success: true, data: project }, { status: 200 });
}
