import ErrorMessage from '@/components/ErrorMessage';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {

    return (
        <section className={styles.section}>
            <ErrorMessage>
                <p>Page not found</p>
            </ErrorMessage>
        </section>
    );
}
 
export default NotFoundPage;