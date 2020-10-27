import Base from '../components/Base'
import Link from 'next/link'
import { BlogItem, formatBlogDate, getAllBlogs } from '../lib/blog'

export default function blog({ blogs }: { blogs: BlogItem[] }) {
    return (<Base>
        <div className="container">
            <div className="row">

                <div className="col-lg-12">
                    <div className="divider"><p /></div>
                </div>

                <div className="col-lg-12">
                    <h3 className="sub-headlines">
                        <img src="/img/news.png" /><span style={{ position: "relative", top: "5px", left: "20px" }}>blog</span>
                    </h3>
                </div>
                <div className="col-lg-2"><p /></div>
                <div className="col-lg-8">
                    <div className="inside-cols">
                        {blogs.map((n) => {
                            return (
                                <>
                                    <h3><Link href={{ pathname: "blog/" + n.id }}><a>{n.title}</a></Link></h3>
                                    <p><em>{formatBlogDate(n)} - {n.author}</em></p>
                                    <ReactMarkdown children={n.excerpt} />
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className="col-lg-2">
                    <p><Link href="/rss/blog"><a><img src="/img/rss-icon.png" width="64" /></a></Link></p>
                </div>
            </div>
        </div>
    </Base>);
}

import type { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown';

export const getStaticProps: GetStaticProps = async (context) => {
    return { props: { blogs: getAllBlogs() } }
}