import { AntdProvider } from '@/components/AntdProvider';
import { DefaultLayout } from '@/components/DefaultLayout';
import { ReactNode } from 'react';

type TProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: TProps) {
  return (
    <html>
      <head />
      <body>
        <AntdProvider>
          <DefaultLayout>
            {children}
          </DefaultLayout>
        </AntdProvider>
      </body>
    </html>
  );
}

