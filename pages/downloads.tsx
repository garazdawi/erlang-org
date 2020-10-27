import Download from '../components/Download'
import type { DownloadProps } from '../components/Download'
import { getAllReleases } from '../lib/github'

export default function Downloads({ release, releases } : DownloadProps) {
    return (<Download release={release} releases={releases} />)
}

import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
    return { props: { release: null, releases : await getAllReleases() } }
}