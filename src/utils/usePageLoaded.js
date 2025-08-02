// usePageLoaded.js
// 判斷頁面是否已完整載入的 Hook (誤刪)
import { useState, useEffect } from 'react';

export function usePageLoaded() {
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        const onPageLoad = () => setIsPageLoaded(true);

        if(document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
        }

        return () => window.removeEventListener('load', onPageLoad);
    }, []);

    return isPageLoaded;
}