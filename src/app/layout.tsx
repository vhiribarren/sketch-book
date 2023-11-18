"use client";

import '@mantine/core/styles.css';

import { MantineProvider, Text, AppShell, Burger, Center, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavbarMenu from '../components/NavbarMenu/NavbarMenu';
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

type RootLayoutProps = { children: React.ReactNode };


export default function RootLayout({ children }: RootLayoutProps) {

  const [mobileOpened, { toggle: toggleMobile, close: closeMobile  }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop}] = useDisclosure(true);
  
  const onNavbarMenuSelection = () => closeMobile();

  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>

          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 200,
              breakpoint: 'sm',
              collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md">
            <AppShell.Header>
              <Group h="100%" px="md">
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Burger onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                <Text size="xl" fw={700}>Sketch Book</Text>
              </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
              <AppShell.Section grow component={ScrollArea}>
                <NavbarMenu onMenuSelection={onNavbarMenuSelection} />
              </AppShell.Section>
              <AppShell.Section>
                <Text ta="center" size="sm">Copyright (c) 2023</Text>
                <Text ta="center" size="sm">Vincent Hiribarren</Text>
              </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main style={{ height: "100vh" }}>
              {children}
            </AppShell.Main>
          </AppShell>

        </MantineProvider>
      </body>
    </html>
  )
}
