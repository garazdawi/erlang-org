import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { formatNewsDate, NewsItem } from '../lib/news'

export interface NewsItemProps {
    item: NewsItem
}

function NewsItemAttachment({ item }: NewsItemProps) {
    if (!item.attachment)
        return null;
    return (
        <div className="text-center">
            <img src={"/upload/news/" + item.attachment} className="img-rounded" />
        </div>);
}

function NewsItemTags({ item }: NewsItemProps) {
    if (!item.tags)
        return null;
    return (
        <div className="panel-footer">
            <p><small>Tags:<i>
                [
                    {item.tags.map((tag) => {
                return (<><Link href={{ pathname: "/news/tag/" + tag }}><a>{tag}</a></Link>&nbsp;</>)
            })}
                ]
            </i></small></p>
        </div>);
}

export default function NewsItemComponent({ item }: NewsItemProps) {
    return (
        <div className="panel" key={item.id}>
            <div className="panel-heading">
                <Link href={{ pathname: "/news/" + item.id }}>
                    <a className="headlines">
                        {item.title}
                    </a>
                </Link>
                <br />
                <em>Written by <a href={"/news/user/" + item.author}>{item.author}</a>, {formatNewsDate(item)}</em>
            </div>
            <NewsItemAttachment item={item} />
            <p>
                <div>
                    <ReactMarkdown children={item.content} plugins={[gfm]}/>
                </div>
            </p>
            <NewsItemTags item={item} />
        </div>
    );
}