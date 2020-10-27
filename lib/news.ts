import matter from 'gray-matter'
import type { GrayMatterFile } from 'gray-matter'

export interface NewsItem {
    id: string;
    title: string;
    article_date: number;
    lead: string;
    attachment?: string;
    author?: string;
    tags?: [string];
    frontmatter: GrayMatterFile<string>['data'];
    content: GrayMatterFile<string>['content'];
}

export function formatNewsDate(item: NewsItem): string {
    let dateTimeFormatter = Intl.DateTimeFormat("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return dateTimeFormatter.format(item.article_date);
}

/* We cache the news as we need to read it multiple times */
let news: NewsItem[] | undefined = undefined;

export function getAllNews(): NewsItem[] {
    if (!news) {
        const context = require.context('../content/news', false, /\.md$/);
        news = context.keys().map<NewsItem>(
            (key) => {
                // Get name of file
                let id = key.replace(/^.[\\\/]/, '').slice(0, -3);
                const document = matter(context(key).default);
                let item: NewsItem = {
                    id: id,
                    title: document.data.title,
                    article_date: Date.parse(document.data.article_date),
                    lead: document.data.lead,
                    frontmatter: document.data,
                    content: document.content
                };
                if (document.data.author)
                    item.author = document.data.author;
                if (document.data.attachment)
                    item.attachment = document.data.attachment;
                if (document.data.tags) {
                    item.tags = document.data.tags
                        .split(/[,]/)
                        .map((tag: string) => { return tag.trim(); });
                }
                return item;
            });
        news = news.sort((a, b) => b.article_date - a.article_date);
    }
    return news
}