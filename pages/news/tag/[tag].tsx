import Base from '../../../components/Base'
import Link from 'next/link'
import NewsItemComponent, { NewsItemProps } from '../../../components/NewsItem'
import { getAllNews, NewsItem } from '../../../lib/news'

interface NewsTags {
    [key: string]: number;
}

export default function News({ news, tags }: { news: NewsItem[], tags: NewsTags }) {

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
                <div className="col-lg-9">

                    {news.map((n) => {
                        return (<NewsItemComponent item={n} />)
                    })}
                    <div id="divider"> </div>
                </div>
                <div className="col-lg-3">
                    Filter news by:
                    <ul>
                        {Object.keys(tags).sort().map((tag) => {
                            return (<li><Link href={{pathname : "/news/tag/" + tag}}><a>{tag}</a></Link> ({tags[tag]})</li>)
                        })}
                    </ul>
                </div>
                <div className="col-lg-12">
                    <div className="divider"><p /></div>
                </div>
            </div>
        </div>
    </Base>);
}

import type { GetStaticProps, GetStaticPaths } from 'next'

function getAllTags(news: NewsItem[]): NewsTags {
    let tags: NewsTags = {};
    for (const item of news) {
        if (!item.tags)
            continue;
        for (const tag of item.tags) {
            if (!tags[tag]) {
                tags[tag] = 1;
            } else {
                tags[tag]++;
            }
        }
    };
    return tags;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const tag = context.params?.tag as string;
    const news = getAllNews();
    const items = news.filter((item) => {
        if (!item.tags)
            return false;
        for (const item_tag of item.tags) {
            if (tag == item_tag)
                return true;
        }
        return false;
    });
    return { props: { news: items, tags: getAllTags(news) } }
}

export const getStaticPaths: GetStaticPaths = async () => {

    const news = getAllNews();
    const tags = getAllTags(news);

    let paths: string[] = [];
    for (const tag in tags) {
        paths.push(`/news/tag/${encodeURIComponent(tag)}`)
    }

    return {
        paths,
        fallback: false
    }
}