import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import '../index.css';
import { Blog } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../const';
import { convertToSlug, getAllBlogs } from '../utils';

const CreateBlog = ({ edit }: Props) => {
    const [title, setTitle] = useState('');
    const [initialValue, setInitialValue] = useState('');
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (edit) {
            const titleSlug = params.slug;
            const blogs = getAllBlogs();
            if (blogs) {
                blogs.forEach((blog) => {
                    if (blog.urlSlug === titleSlug) {
                        setTitle(blog?.title);
                        setInitialValue(blog?.content);
                    }
                });
            }
        }
    }, [edit, params.slug]);

    const saveBlog = () => {
        if (!title) {
            alert('Enter title first');
            return;
        }
        if (!editorRef.current) {
            alert('Editor is not mounted');
            return;
        }
        const content = editorRef.current.getContent();
        if (!content) {
            alert('Please enter some content on the text editor');
            return;
        }
        const data: Blog = {
            title: title,
            content,
            urlSlug: convertToSlug(title),
        };
        const blogs = getAllBlogs() ?? [];
        let blogAlreadyExist = false;
        let updatedBlogsArray = blogs.map((blog) => {
            if (blog.urlSlug === data.urlSlug) {
                blogAlreadyExist = true;
                return { ...blog, ...data };
            }
            return blog;
        });
        if (!blogAlreadyExist) {
            updatedBlogsArray = updatedBlogsArray.concat(data);
            if (edit) {
                const titleSlug = params.slug;
                updatedBlogsArray = updatedBlogsArray.filter((blog) => blog.urlSlug !== titleSlug);
            }
        }

        const updatedBlogs = JSON.stringify(updatedBlogsArray);
        localStorage.setItem(LOCAL_STORAGE_KEYS.blogs, updatedBlogs);
        navigate('/');
    };
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: 10 }}>Create Your Blog</h1>
            <>
                <form onSubmit={saveBlog}>
                    <input
                        className="titleInput"
                        name="title"
                        id="title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        value={title}
                        required
                    />

                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={initialValue}
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help' +
                                ' | image',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                    />
                    <input className="submitButton" type="submit" value="Submit"></input>
                </form>
            </>
        </div>
    );
};

export default CreateBlog;

type Props = {
    edit?: boolean;
};
