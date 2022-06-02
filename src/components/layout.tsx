import { Outlet } from 'react-router-dom';

import '../index.css';

function Layout() {
    return (
        <div className="layout">
            <Outlet />
        </div>
    );
}

export default Layout;
