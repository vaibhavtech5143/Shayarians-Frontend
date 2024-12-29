import { useState } from 'react';

import ConfessionBox from '@/pages/ConfessionBox';
import ViewConfessions from '@/pages/ViewConfessionBox';

export const Confession = () => {
    const [isViewingConfessions, setIsViewingConfessions] = useState(false);

    const navigateToView = () => setIsViewingConfessions(true);
    const navigateBack = () => setIsViewingConfessions(false);
    return isViewingConfessions ? (
        <ViewConfessions onNavigateBack={navigateBack} />
      ) : (
        <ConfessionBox onNavigateToView={navigateToView} />
      );
    };
