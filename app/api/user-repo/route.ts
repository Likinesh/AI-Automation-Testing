import { db, repositories } from "@/db";
import { eq } from "drizzle-orm";
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
        owner,
        language,
        defaultBranch: default_branch
    }).returning();

    return NextResponse.json(result[0]);
}

export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url);

    const userId = searchParams.get("userId");
    // if(!userId){
    //     return NextResponse.json({error: "User ID is required"}, {status : 400});
    // }
    const result = await db.select().from(repositories).where(
        //@ts-ignore
        eq(repositories.userId, userId || 0)
    );
    const mappedResult = result.map(r => ({
        ...r,
        full_name: r.fullName,
        private_: r.private_,
        html_url: r.htmlUrl,
        updated_at: r.updatedAt,
        default_branch: r.defaultBranch,
    }));
    return NextResponse.json(mappedResult);
}