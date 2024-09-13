import React from 'react';
import { Header } from '@/components/Header/Header';
import { SideNavBar } from '@/components/SideNavBar/SideNavBar';

export default function PortalLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <SideNavBar />
      <main>{children}</main>
    </>
  );
}
