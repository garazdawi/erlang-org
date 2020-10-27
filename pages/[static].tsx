import Base from '../components/Base'
import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

export default function StaticMD({ static_md } : { static_md : string }) {
    return (
        <Base>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="divider"><p /></div>
                    </div>

                    <div className="static_div">
                        <div className="col-lg-12">
                            <h3 className="sub-headlines">
                                <img src="/img/info.png" />
                                <span style={{ position: "relative", top: "5px", left: "20px" }}>ABOUT</span>
                            </h3>
                            <div className="inside-cols">
                                <ReactMarkdown children={static_md} plugins={[gfm]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Base >);
}

import type { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
    const md = context.params?.static as string;
    const require_ctx = require.context('../content/', false, /\.md/);
    return { props: { static_md: require_ctx("./"+md+".md").default } }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths : ["/about","/community"],
        fallback: false
    }
}