import React from "react";
import { Header } from '@/components/Header/Header';

export default function PortalLayout({ children }: React.PropsWithChildren) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}