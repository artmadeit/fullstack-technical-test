import {
  Anchor,
  Button,
  Group,
  Text,
  Title,
} from '@mantine/core';
import classes from './Welcome.module.css';
import Link from 'next/link';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          AlbergueApp
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Administre su albergue de animales rescatados (perros y gatos) Lleve un control de los
        voluntarios que trabajan en su albergue ,los adoptantes y las adopciones.
      </Text>
      <Group justify="center" mt="xl">
        <Button component={Link} href="signIn">Adopte su mascota</Button>
      </Group>
    </>
  );
}
