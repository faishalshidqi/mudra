import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(WrappedComponent) {
    const Wrapper = (props) => {
        const router = useRouter();

        useEffect(() => {
            // Check if user is logged in (you'll need to implement your own logic here)
            const isLoggedIn = checkIfUserIsLoggedIn();

            if (!isLoggedIn) {
                router.push('/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};
