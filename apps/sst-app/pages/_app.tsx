import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}