"use client";

import "@mantine/core/styles.css";

import { MantineProvider, Text, AppShell, Burger, Switch, Group, ScrollArea, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavbarMenu from "../components/NavbarMenu/NavbarMenu";
import { Inter } from "next/font/google";
import { Settings } from "./Context";

import "./globals.css";
import menuContent from "../config/menu.json";
import { ReactNode, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = { children: ReactNode };


export default function RootLayout({ children }: RootLayoutProps) {

  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [displayFps, setDisplayFps] = useState(false);

  const onNavbarMenuSelection = () => closeMobile();

  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
          <Settings.Provider value={{displayFps}}>

            <AppShell
              header={{ height: 60 }}
              navbar={{
                width: 220,
                breakpoint: "sm",
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
                  <NavbarMenu onMenuSelection={onNavbarMenuSelection} menuContent={menuContent}/>
                </AppShell.Section>
                <AppShell.Section>
                  <Switch label="Display FPS" onChange={(event) => setDisplayFps(event.currentTarget.checked)} checked={displayFps} />
                </AppShell.Section>
                <Space h="md" />
                <AppShell.Section>
                  <Text ta="center" size="sm">Copyright (c) 2023</Text>
                  <Text ta="center" size="sm">Vincent Hiribarren</Text>
                </AppShell.Section>
              </AppShell.Navbar>
              <AppShell.Main style={{ height: "100vh" }}>
                {children}
              </AppShell.Main>
            </AppShell>

          </Settings.Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
