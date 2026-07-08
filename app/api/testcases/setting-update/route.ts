import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { repositories } from "@/db/schema";
import { db } from "@/db";

export async function POST(req: NextRequest){
    try{
        const {repoId, targetDomain, globalInstruction} = await req.json();   
        const updatedRepo = await db.update(repositories).set({
            targetDomain: targetDomain,
            globalInstruction: globalInstruction,
        }).where(eq(repositories.repoId, repoId)).returning();
        
        return NextResponse.json(updatedRepo);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to update repo settings" }, { status: 500 });
    }
}