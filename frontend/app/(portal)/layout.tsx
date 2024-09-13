"use client"
import React from 'react';
import { Header } from '@/components/Header/Header';
import { SideNavBar } from '@/components/SideNavBar/SideNavBar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function PortalLayout({ children }: React.PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  return (

    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SideNavBar />
      </AppShell.Navbar>
      <AppShell.Main>
        <main>{children}</main>
      </AppShell.Main>
    </AppShell>
  );
}
