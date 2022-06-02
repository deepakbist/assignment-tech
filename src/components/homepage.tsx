import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../const';
import { Blog } from '../types';
import '../index.css';

const Homepage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const localBlogs = localStorage.getItem(LOCAL_STORAGE_KEYS.blogs);
        if (localBlogs) {
            const blogs = JSON.parse(localBlogs);
            setBlogs(blogs);
        }
    }, []);
    return (
        <div>
            {' '}
            {blogs?.length === 0 ? (
                <h1 style={{ textAlign: 'center', marginBottom: 10 }}>No Blogs found!</h1>
            ) : (
                <div style={{ marginBottom: 10 }}>
                    <h1>Blogs List:</h1>
                    <br />
                    {blogs?.length > 0 &&
                        blogs.map((blog, i) => {
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginRight: 10 }}>
                                        <Link to={`blog/${blog.urlSlug}`}>
                                            <h3>{blog.title}</h3>
                                        </Link>
                                    </div>
                                    <div>
                                        <button
                                            style={{ padding: 2 }}
                                            onClick={() => navigate(`blog/${blog.urlSlug}/edit`)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <br />
                                </div>
                            );
                        })}
                </div>
            )}
            <button className="submitButton" onClick={() => navigate('/blog-create')}>
                Create Your Own Blog
            </button>
        </div>
    );
};

export default Homepage;
