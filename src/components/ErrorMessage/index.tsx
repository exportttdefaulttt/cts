import clsx from 'clsx';
import type { ReactNode } from 'react';
import errorImage from './error.gif';

import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
    children: ReactNode;
    className?: string;
};

const ErrorMessage = ({ children, className }: ErrorMessageProps) => {

    return (
        <div className={clsx(styles.root, className)}>
            <img className={styles.img} src={errorImage} alt="Error" />
            {children}
        </div>
    );
}
 
export default ErrorMessage;