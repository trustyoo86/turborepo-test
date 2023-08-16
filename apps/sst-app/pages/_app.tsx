import { SWRConfig } from 'swr';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </SWRConfig>
  );
}