import { Octokit } from "@octokit/rest";
import type { ReposListReleasesResponseData } from '@octokit/types'

let releases: ReposListReleasesResponseData | undefined = undefined;

export async function getAllReleases() {
    if (!releases) {
        if (!process.env.GITHUB_TOKEN) {
            console.warn(`Running without github authentication, 
consider setting GITHUB_TOKEN in order for the API to not throttle you.`)
        }
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN
        });
        releases = await octokit.paginate(octokit.repos.listReleases,
            { owner: "erlang", repo: "otp" });
        releases.sort((a, b) => {
            const vsn_match = /^OTP-([0-9]+)\.([0-9]+)(\.[0-9]+)?(\.[0-9]+)?(\.[0-9]+)?(\.[0-9]+)?/;
            const a_match = a.tag_name.match(vsn_match);
            const b_match = b.tag_name.match(vsn_match);
            for (var i = 1; i < 7; i++) {
                if (a_match?.[i] == b_match?.[i])
                    continue;
                if (a_match?.[i] == undefined)
                    return 1;
                if (b_match?.[i] == undefined)
                    return -1;
                if (b_match?.[i] < a_match[i])
                    return -1;
                return 1;
            }
            return 0;
        });
    }
    return releases;
}

export async function getRelease(tag: string) {
    const releases = await getAllReleases();
    return releases.find((release) => {
        return release.tag_name == tag;
    });
}