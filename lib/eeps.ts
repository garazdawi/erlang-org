import matter from 'gray-matter'
import type { GrayMatterFile } from 'gray-matter'

export interface EEPItem {
    id: string;
    content: string;
}

/* We cache the news as we need to read it multiple times */
let eeps: { [key: string]: EEPItem } = {};

export function getAllEEPs(): { [key: string]: EEPItem } {
    if (Object.keys(eeps).length == 0) {
        const context = require.context('../content/eep/eeps', false, /\.html$/);
        context.keys().forEach(
            (key) => {
                // Get name of file
                const id = key.replace(/^.[\\\/]/, '').slice(4, -5);
                let content = context(key).default;
                content = content.replace(
                    /href="eep-([0-9]+)\.html"/g,
                    "href=\"/eeps/eep-$1\""
                );
                eeps[id] = { id, content };
            });
    }
    return eeps
}