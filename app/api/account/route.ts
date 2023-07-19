import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const payload = await req.json();
  const isExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isExist) {
    return NextResponse.json(
      { success: false, data: null, message: "Email exists" },
      { status: 200 }
    );
  }

  const user = await prisma.user.create({
    data: {
      ...payload,
    },
  });
  return NextResponse.json({ success: true, data: user }, { status: 200 });
}
