import { LOCAL_STORAGE_KEYS } from './const';
import { Blog } from './types';

export function convertToSlug(text: string) {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

export const getAllBlogs = (): Blog[] | null => {
    try {
        const localBlogs = localStorage.getItem(LOCAL_STORAGE_KEYS.blogs);
        if (localBlogs) {
            return JSON.parse(localBlogs) as Blog[];
        }
        return null;
    } catch (error) {
        console.log('Error!', error);
        return null;
    }
};
