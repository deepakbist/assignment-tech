import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../types';
import { getAllBlogs } from '../utils';

const Blog = () => {
    const params = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const titleSlug = params.slug;
        const blogs = getAllBlogs();
        if (blogs) {
            blogs.forEach((blog) => {
                if (blog.urlSlug === titleSlug) setBlog(blog);
            });
        }
    }, [params?.slug]);
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{blog?.title}</h1>

            {blog?.content && <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>}
        </div>
    );
};

export default Blog;
