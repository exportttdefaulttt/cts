import type { AppRegion } from '@/api';

export const REGIONS = [
    'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'
] as const satisfies readonly AppRegion[];