import Base from '../../components/Base'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { BlogItem, formatBlogDate, getAllBlogs } from '../../lib/blog'

export default function BlogIndex({ item }: { item: BlogItem }) {
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
                <div className="col-lg-2"><p /></div>
                <div className="col-lg-8">
                    <div className="inside-cols">
                        <h3><Link href={{ pathname: item.id }}><a>{item.title}</a></Link></h3>
                        <p><em>{formatBlogDate(item)} - {item.author}</em></p>
                        <ReactMarkdown children={item.content} />
                    </div>
                </div>
                <div className="col-lg-2">
                    <p><Link href="/rss/blog"><a><img src="/img/rss-icon.png" width="64" /></a></Link></p>
                </div>
            </div>
        </div>
    </Base>);
}

import type { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
    const tag = context.params?.blog as string;
    const blogs = getAllBlogs();
    const item = blogs.find((item) => item.id == tag);
    return { props: { item } }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllBlogs().map((item) => {
        return `/blog/${item.id}`;
    });

    return {
        paths,
        fallback: false
    }
}