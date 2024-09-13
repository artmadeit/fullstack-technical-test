'use client';

import {
  IconDog,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2
} from '@tabler/icons-react';
import React from 'react';
import classes from './SideNavBar.module.css';

const data = [
  { link: '', label: 'Animales en albergue', icon: IconDog },
  { link: '', label: 'Voluntarios', icon: IconReceipt2 },
  { link: '', label: 'Adoptantes', icon: IconFingerprint },
  { link: '', label: 'Adopciones', icon: IconKey },
];

export function SideNavBar() {
  const [active, setActive] = React.useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      <div className={classes.navbarMain}>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </>
  );
}
