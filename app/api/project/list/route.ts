import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

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
