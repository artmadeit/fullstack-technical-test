import { Group } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Header.module.css';

export function Header() {
  // const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" /> */}
          <MantineLogo size={28} />
        </Group>
        <Group>
          {/* <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group> */}
          <Group visibleFrom="sm">
            {/* <Button variant="default">Log in</Button>
            <Button>Sign up</Button> */}
          </Group>
        </Group>
      </div>
    </header>
  );
}
