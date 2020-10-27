import Base from '../../components/Base'
import Link from 'next/link'
import { getAllReleases } from '../../lib/github'
import type { ReposListReleasesResponseData } from "@octokit/types"

export default function Versions({ releases }: { releases: ReposListReleasesResponseData }) {

    return (<Base>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="divider"><p /></div>
                </div>

                <div className="col-lg-12">
                    <h3 className="sub-headlines"><img src="/img/lightbubble.png" /> ALL RELEASED DOCUMENTATION</h3>
                </div>
                <div className="inside-cols">
                    <div className="col-lg-12">
                        <table className="table" id="rel-table">
                            <thead>
                                <tr>
                                    <th><em>Release</em></th>
                                    <th id="rel-table-ver"><em>Version</em></th>
                                    <th colSpan={2}><em>Documentation</em></th>
                                </tr>
                            </thead>
                            <tbody>
                                {releases.map((release) => {
                                    return (<tr>
                                        <td>{release.name}</td>
                                        <td>{release.tag_name}</td>
                                        <td colSpan={2}>
                                            {(() => {
                                                const html = release.assets.find((asset) => {
                                                    return asset.name.includes("html");
                                                });
                                                if (html) {
                                                    return (<Link href={{ pathname: html.browser_download_url }}>
                                                        <a>HTML + PDF</a></Link>);
                                                }
                                                return (<></>);
                                            })()}
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Base>);
}


import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
    return { props: { releases: await getAllReleases() } }
}