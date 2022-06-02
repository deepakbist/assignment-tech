import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import NotFound from './components/not-found';
import Layout from './components/layout';
import CreateBlog from './components/create-blog';
import Blog from './components/blog';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Homepage />}></Route>
                    <Route path="/blog/:slug" element={<Blog />}></Route>
                    <Route path="/blog/:slug/edit" element={<CreateBlog edit />}></Route>
                    <Route path="/blog-create" element={<CreateBlog />}></Route>
                </Route>

                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
