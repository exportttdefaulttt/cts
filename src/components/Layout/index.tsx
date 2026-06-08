import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Header from '@/components/Header';
import Aside from '@/components/Aside';
import Spinner from '@/components/Spinner';

import styles from './Layout.module.scss';

const Layout = () => {

    return (
        <div className={styles.app}>
            <Header />
            <main>
                <Suspense fallback={<Spinner style={{ placeSelf: 'center' }} />}>
                    <Outlet />
                </Suspense>
            </main>
            <Aside />
        </div>
    );
}
 
export default Layout;