import matter from 'gray-matter'
import type { GrayMatterFile } from 'gray-matter'

export interface BlogItem {
    id: string;
    title: string;
    article_date: number;
    author: string;
    tags: [string];
    excerpt: string;
    frontmatter: GrayMatterFile<string>['data'];
    content: GrayMatterFile<string>['content'];
}

export function formatBlogDate(item: BlogItem): string {
    let dateTimeFormatter = Intl.DateTimeFormat("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return dateTimeFormatter.format(item.article_date);
}

/* We cache the blogs as we need to read it multiple times */
let blogs: BlogItem[] | undefined = undefined;

export function getAllBlogs(): BlogItem[] {
    if (!blogs) {
        const context = require.context('../content/blog/_posts', false, /\.md$/);
        blogs = context.keys().map(
            (key) => {
                // Get name of file
                const matches = key.match(/\.\/([0-9]{4}-[0-9]{1,2}-[0-9]{1,2})-(.*)\.md/) as RegExpMatchArray;
                const document = matter(context(key).default, {excerpt: true, excerpt_separator: "\n\n"});
                let item: BlogItem = {
                    id: matches[2],
                    title: document.data.title,
                    author: document.data.author,
                    excerpt: document.excerpt as string,
                    article_date: Date.parse(matches[1]),
                    tags: document.data.tags
                        .split(/[,]/)
                        .map((tag: string) => { return tag.trim(); }),
                    frontmatter: document.data,
                    content: document.content
                };
                return item;
            });
        blogs = blogs.sort((a, b) => b.article_date - a.article_date);
    }
    return blogs
}