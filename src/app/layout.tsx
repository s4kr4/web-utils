import { SideMenu } from '@/components/parts/SideMenu';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Utils for s4kr4',
  description: 'Web Utils for s4kr4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <div className="container flex dark text-foreground bg-background">
            <aside>
              <SideMenu></SideMenu>
            </aside>
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
