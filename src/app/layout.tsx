"use client";

import './globals.css'
import styles from './layout.module.css'

import { Layout } from 'antd';
import MainView from './MainView';
import SideNav from './SideNav';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const { Header, Footer, Sider, Content } = Layout;

type RootLayoutProps = { children: React.ReactNode };


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout className={styles.mainlayout}>
          <Header className={styles.header}>Sketch Book</Header>
          <Layout hasSider>
            <Sider breakpoint="md" collapsedWidth="0">
              <SideNav />
            </Sider>
            <Content>
              <MainView>{children}</MainView>
            </Content>
          </Layout>
          <Footer className={styles.footer}>Copyright (c) 2023 Vincent Hiribarren</Footer>
        </Layout>
      </body>
    </html>
  )
}
