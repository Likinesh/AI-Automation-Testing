import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookieStore = await cookies();
    const token = cookieStore.get("github_token")?.value;

    if(!token){
        return NextResponse.json(JSON.stringify({error:"Github token not found"}));
    }

    const allRepos = [];
    let page=1;
    while(true){
        const res = await fetch(
            `https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json",
                    "User-Agent": "AutoPilot-QA-App",
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            }
        );

        if (!res.ok) {
            console.error("GitHub API Error:", res.status, await res.text());
            break;
        }

        const repos = await res.json();
        if(!repos || !repos.length){
            break;
        }
        allRepos.push(...repos);
        page++;
    }
    return NextResponse.json(allRepos.map(r=>({
        id:r.id,
        name:r.name,
        full_name: r.full_name,
        private: r.private,
        html_url:r.html_url,
        description: r.description,
        updated_at: r.updated_at,
        language: r.language,
        default_branch: r.default_branch,
        owner: r.owner.login
    })));
}