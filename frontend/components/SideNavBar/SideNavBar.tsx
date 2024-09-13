'use client';

import React from 'react';
import {
  IconDog,
  IconFingerprint,
  IconKey,
  IconReceipt2
} from '@tabler/icons-react';
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
        {/* <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} />
        </Group> */}
        {links}
      </div>

      {/* <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div> */}
    </>
  );
}
