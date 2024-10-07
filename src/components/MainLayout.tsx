import React from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

/**
 * The main layout component.
 *
 * This component renders a sidebar on the left and the main content area on
 * the right. The sidebar is always visible and the content area takes up the
 * remaining space.
 *
 * @param children The React children to be rendered in the main content area.
 * @returns The main layout component.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }): JSX.Element => {
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