import { useEffect } from 'react';

const useBeforeUnload = () => {
    useEffect(() => {
        const beforeUnloadHandler = () => {
            localStorage.removeItem("seenPopup");
        };

        window.addEventListener('beforeunload', beforeUnloadHandler);

        return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
        };
    }, []);
};

export default useBeforeUnload;
