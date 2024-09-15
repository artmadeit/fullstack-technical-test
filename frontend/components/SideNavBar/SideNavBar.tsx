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

const data = [
  { link: 'animals', label: 'Animales en el albergue', icon: IconDog },
  { link: 'volunteers', label: 'Voluntarios', icon: IconUsers },
  { link: '', label: 'Adoptantes', icon: IconHomeHand },
  { link: '', label: 'Adopciones', icon: IconHeartHandshake },
];

export function SideNavBar() {
  // const [active, setActive] = React.useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      // data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <Link href="/" className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
        {/* <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a> */}
      </div>
    </>
  );
}
