import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectActiveRegion, selectLoadingStatusFlags } from '@/store/slices/countriesByRegion/selectors';
import { updateActiveRegion } from '@/store/slices/countriesByRegion/actions';
import { REGIONS } from '@/utils/constants';
import type { AppRegion } from '@/api';

import styles from './RegionalFilter.module.scss';

const RegionalFilter = () => {

    const activeRegion = useAppSelector(selectActiveRegion);
    const { isLoading } = useAppSelector(selectLoadingStatusFlags);

    const dispatch = useAppDispatch();

    const onUpdateActiveRegion = (region: AppRegion, isCurrentRegion: boolean) => {
        if (isCurrentRegion) return;

        dispatch(updateActiveRegion(region));
    };

    return (
        <div className={styles.btnGroup}>
            {
                REGIONS.map(region => {
                    const isActive = region === activeRegion;

                    return (
                        <button 
                            key={region} 
                            className={isActive ? styles.active : undefined}
                            disabled={isLoading}
                            onClick={() => onUpdateActiveRegion(region, isActive)}
                        >
                            {region}
                        </button>
                    )
                })
            }
        </div>
    );
}
 
export default RegionalFilter;