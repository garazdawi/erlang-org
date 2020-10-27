import Download from '../../components/Download'
import type { DownloadProps } from '../../components/Download'
import { getAllReleases, getRelease } from '../../lib/github'

export default function Downloads({ release, releases }: DownloadProps) {
    return (<Download release={release} releases={releases} />)
}

import type { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
    const tag = context.params?.tag as string;
    const releases = await getAllReleases();
    const release = await getRelease(tag);
    return { props: { release, releases } }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const releases = await getAllReleases();
    const paths =  releases.map((release) => {
        return `/downloads/${release.tag_name}`;
    });

    return {
        paths,
        fallback: false
    }
}