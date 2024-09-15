'use client';

import React from 'react';
import Link from 'next/link';
import {
  IconDog,
  IconHeartHandshake,
  IconHomeHand,
  IconLogout,
  IconUsers,
} from '@tabler/icons-react';
import classes from './SideNavBar.module.css';
import { Anchor } from '@mantine/core';
import { signOut } from 'next-auth/react';

const data = [
  { link: 'animals', label: 'Animales en el albergue', icon: IconDog },
  { link: 'volunteers', label: 'Voluntarios', icon: IconUsers },
  { link: 'adopters', label: 'Adoptantes', icon: IconHomeHand },
  { link: 'adoptions', label: 'Adopciones', icon: IconHeartHandshake },
];

export function SideNavBar() {
  // const [active, setActive] = React.useState('Billing');

  const links = data.map((item) => (
    <Link
      className={classes.link}
      // data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <Anchor component="button" className={classes.link} onClick={() => signOut()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Cerrar sesion</span>
        </Anchor>
        {/* <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a> */}
      </div>
    </>
  );
}
