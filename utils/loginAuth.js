import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import CookieHandler from '../lib/CookieHandler';

function loginAuth(WrappedComponent) {
    return (props) => {
        const isAuthenticated = CookieHandler.getToken();
        const router = useRouter();

        useEffect(() => {
            // Redirect to login page if not authenticated
            if (!isAuthenticated) {
                router.replace('/login');
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return <Loading />; // or any other loading state/component
        }

        // Render the wrapped component if authenticated
        return <WrappedComponent isAuthenticated={isAuthenticated} {...props} />;
    };
}

export default loginAuth;
