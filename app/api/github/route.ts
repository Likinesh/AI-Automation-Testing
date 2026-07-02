import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_REDIRECT_URI?.trim() ;

    if (!clientId || !redirectUri) {
        return NextResponse.json(
            { error: "Missing GitHub OAuth environment variables" },
            { status: 500 },
        );
    }

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: "repo read:user",
    });

    return NextResponse.redirect(
        `https://github.com/login/oauth/authorize?${params.toString()}`,
    );
}