import "@/styles/globals.css";
import { ProcessusProvider } from '@/Context/ProcessusContext';


function MyApp({ Component, pageProps }) {
    return (
        <ProcessusProvider>
            <Component {...pageProps} />
        </ProcessusProvider>
    );
}

export default MyApp;