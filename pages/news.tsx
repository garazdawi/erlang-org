import Base from '../components/Base'
import Link from 'next/link'
import NewsItemComponent from '../components/NewsItem'
import type { NewsItem } from '../lib/news'

export default function News({ news }: { news: NewsItem[] }) {
    return (<Base>
        <div className="container">
            <div className="row">

                <div className="col-lg-12">
                    <div className="divider"><p /></div>
                </div>

                <div className="col-lg-12">
                    <h3 className="sub-headlines">
                        <img src="/img/news.png" /><span style={{ position: "relative", top: "5px", left: "20px" }}>NEWS</span>
                    </h3>
                </div>
                <div className="col-lg-11">
                    <div className="inside-cols">
                        {news.map((n) => {
                            return (<NewsItemComponent item={n} />)
                        })}
                    </div>
                </div>
                <div className="col-lg-1">
                    <p><Link href="/rss/news"><a><img src="/img/rss-icon.png" width="64" /></a></Link></p>
                </div>
            </div>
        </div>
    </Base>);
}

import type { GetStaticProps } from 'next'
import { getAllNews } from '../lib/news'

export const getStaticProps: GetStaticProps = async (context) => {
    return { props: { news: getAllNews() } }
}