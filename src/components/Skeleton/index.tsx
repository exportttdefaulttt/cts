import clsx from 'clsx';

import styles from './Skeleton.module.scss';

const Skeleton = () => {

    return (
        <div className={styles.root}>
            <p className={styles.select}>
                Please select a country to see information
            </p>
            <div className={styles.skeleton}>
                <div className={clsx(styles.pulse, styles.header)}>
                    <div className={clsx(styles.pulse, styles.circle)}></div>
                    <div className={clsx(styles.pulse, styles.mini)}></div>
                </div>
                <div className={clsx(styles.pulse, styles.block)}></div>
                <div className={clsx(styles.pulse, styles.block)}></div>
                <div className={clsx(styles.pulse, styles.block)}></div>
            </div>
        </div>
    );
}
 
export default Skeleton;