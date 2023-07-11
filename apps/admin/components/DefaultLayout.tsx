'use client';

import { Layout } from "antd";
import { ReactNode } from "react";

const { Header } = Layout;

type TProps = {
  children: ReactNode;
}

export function DefaultLayout({ children }: TProps) {
  return (
    <Layout>
      <Header>
        <div className="demo-logo" />
      </Header>
      <Layout>
        {children}
      </Layout>
    </Layout>
  );
}