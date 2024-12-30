import 'reactflow/dist/style.css';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/app/providers/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children}: { children: React.ReactNode; }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReactQueryProvider>
                    <main className="h-screen">
                        {children}
                    </main>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
