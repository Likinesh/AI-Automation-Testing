import { db, repositories } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { repoId, userId, name, full_name, private_, language, html_url, description, updated_at, default_branch, owner} = await req.json();
    
    //@ts-ignore
    const result = await db.insert(repositories).values({
        repoId,
        userId,
        name,
        fullName: full_name,
        private_ : private_?1:0,
        htmlUrl: html_url,
        description: description,
        updatedAt: new Date(updated_at),
        owner
    }).returning();

    return NextResponse.json(result[0]);
}