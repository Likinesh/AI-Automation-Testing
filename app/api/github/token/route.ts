import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("github_token")?.value;

    if (!token) {
        return NextResponse.json({token:""}); 
    }

    return NextResponse.json({ token });
}