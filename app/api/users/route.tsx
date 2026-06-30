import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const user = await currentUser();
    try{
        const userResult = await db.select().from(users).where(
            eq(users.email, user?.primaryEmailAddress?.emailAddress ?? "")
        );
        if(userResult.length == 0) {
            const newUser = await db.insert(users).values({
                email: user?.primaryEmailAddress?.emailAddress || "",
                name: user?.fullName || ""
            });

            return NextResponse.json({user : newUser})
        } else {
            return NextResponse.json({user: userResult[0]})
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}