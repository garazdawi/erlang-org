import Base from './Base'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import type { ReposListReleasesResponseData, ReposGetReleaseByTagResponseData } from "@octokit/types"

export interface DownloadProps {
    release: ReposGetReleaseByTagResponseData;
    releases: ReposListReleasesResponseData;
}

export default function Download({ release, releases }: DownloadProps) {
    let majorReleases = releases.filter((rel) => { return rel.tag_name.match(/^OTP-[0-9]+\.[0-9]$/) && !rel.prerelease; });

    let currentRelease = release;

    if (release == null) {
        currentRelease = majorReleases[0];
    }

    return (
        <Base>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="divider"><p /></div>
                    </div>

                    <div className="col-lg-12">
                        <h3 className="sub-headlines">
                            <img src="/img/download.png" />
                            <span style={{ position: 'relative', top: '3px', left: '20px' }}>
                                DOWNLOAD {currentRelease.name}
                            </span>
                        </h3>
                    </div>

                    <div className="inside-cols">
                        <div className="col-lg-9">

                            <div className="panel">
                                <p>
                                    <ReactMarkdown children={currentRelease.body} plugins={[gfm]} />
                                </p>
                                <p>
                                    <h3>Artifacts: </h3>
                                </p>
                                {currentRelease.assets.filter((asset) => { return !asset.name.match(/bundle/); }).map((asset) => {
                                    return (
                                        <p>
                                            <Link href={{ pathname: asset.url }}>
                                                <a>{asset.name} file</a>
                                            </Link>
                                        &nbsp;({asset.size} bytes)
                                        </p>
                                    );
                                })}
                            </div>
                            <ReactMarkdown children={
                                `#### **Compiling Erlang from source**
You can build Erlang from source on your own, following the [building and installation instructions](https://github.com/erlang/otp/blob/maint/HOWTO/INSTALL.md).
Or use the [Kerl](https://github.com/kerl/kerl) script. Kerl is a script that lets you easily build Erlang with a few commands.
Follow the [instructions](https://github.com/kerl/kerl) to build.

#### **Source Versions and Windows Binaries for Patches**
Information about all released OTP versions since OTP 17.0 can be found at the [OTP Versions Tree](https://erlang.org/download/otp_versions_tree.html) page.
This information includes a link to the GitHub source tag, and a link to the README. As of OTP 23, Windows binaries can also be downloaded from here for all patches.

#### **Pre-built Binary Packages**

Most OS package managers provide pre-built binary packages. You can also download the latest stable releases [from Erlang Solutions](https://www.erlang-solutions.com/resources/download.html).
Erlang Solutions provides [pre-built binary packages](https://www.erlang-solutions.com/resources/download.html) for OS X, Windows, Ubuntu, Debian, Fedora, CentOS, Raspbian and other operating systems. 

* For Homebrew on OS X: brew install erlang
* For MacPorts on OS X: port install erlang
* For Ubuntu and Debian: apt-get install erlang
* For Fedora: yum install erlang
* For FreeBSD: pkg install erlang

#### **License**
Since OTP 18.0, Erlang/OTP is released under [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).
The older releases prior to 18.0 were released under [Erlang Public License (EPL)](https://erlang.org/EPLICENSE),
a derivative work of the Mozilla Public License (MPL).
`} plugins={[gfm]} />
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <h4>Available releases</h4>
                        <ul>{majorReleases.map((rel) => {
                            return (
                                <li key={rel.tag_name}>
                                    <Link href={{ pathname: `/downloads/${rel.tag_name}` }}>
                                        <a>
                                            {rel.name}
                                        </a>
                                    </Link>&nbsp;
                                    <Link href={{ pathname: rel.html_url }}>
                                        <a>
                                            GH
                                    </a>
                                    </Link>
                                </li>
                            )
                        })
                        }
                        </ul>
                        <p>
                            PDF files are included in the Windows installer and in the
                            HTML documentation tarballs, starting with the
	  <a href="/downloads/R13B03">R13B03</a> release.
	</p>
                        <p>
                            There is a file containing <a href="/download/MD5">MD5 checksums</a>
	  for all files in the <a href="/download/">download directory</a>,
	  also reachable through <code>rsync rsync.erlang.org::erlang-download</code>
                        </p>
                    </div>
                </div>
            </div>
        </Base >
    );
}