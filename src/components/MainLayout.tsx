import React from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen overflow-y-auto">
            <Sidebar />
            <div className="flex-grow p-6">
                { children }
            </div>
        </div>
    )
}

export default MainLayout;