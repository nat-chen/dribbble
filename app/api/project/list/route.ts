import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("category") || {};
  const search = searchParams.get("search") || "";
  const project = await prisma.project.findMany({
    where: {
      title: {
        contains: search,
      },
      category: {
        name,
      },
      user: {
        email: session?.user?.email,
      },
    },
    include: {
      user: true,
    },
  });
  return NextResponse.json({ success: true, data: project }, { status: 200 });
}
