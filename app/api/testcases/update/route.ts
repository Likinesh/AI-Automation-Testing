import { db, TestCasesTable } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {title, description, targetRoute, expectedResult, testCaseId} = await req.json();

    if(!testCaseId) {
        return NextResponse.json({error: "Test case ID is required"}, {status: 400});
    }
    
    const updatedTestCase = await db.update(TestCasesTable).set({
        title,
        description,
        targetRoute,
        expectedResult,
    }).where(eq(TestCasesTable.id, testCaseId)).returning();

    return NextResponse.json(updatedTestCase[0]);
}