import { db, TestCasesTable } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const repoId = url.searchParams.get("repoId");

    if (!repoId) {
      return NextResponse.json(
        {
          error: "repoId is required",
        },
        { status: 400 },
      );
    }

    const testCases = await db
      .select()
      .from(TestCasesTable)
      .where(eq(TestCasesTable.repoId, repoId));

    return NextResponse.json(testCases);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
