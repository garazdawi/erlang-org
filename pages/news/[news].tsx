import Base from '../../components/Base'
import Link from 'next/link'
import NewsItemComponent from '../../components/NewsItem'
import { getAllNews, NewsItem } from '../../lib/news'

export default function News({ item }: { item: NewsItem }) {
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
                        <NewsItemComponent item={item} />
                    </div>
                </div>
                <div className="col-lg-1">
                    <p><Link href={{pathname: "/rss/news"}}><a><img src="/img/rss-icon.png" width="64" /></a></Link></p>
                </div>
            </div>
        </div>
    </Base>);
}

import type { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
    const tag = context.params?.news as string;
    const news = getAllNews();
    const item = news.find((item) => item.id == tag );
    return { props: { item } }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllNews().map((item) => {
        return `/news/${item.id}`;
    });

    return {
        paths,
        fallback: false
    }
}