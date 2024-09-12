'use client';

import { Button, Group, Modal, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import classes from './Welcome.module.css';

export function Welcome() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [formType, setFormType] = useState<'register' | 'login'>('login');
  // const [loading, setLoading] = useState(false);

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
        <Button onClick={toggle}>Iniciar sesión</Button>
      </Group>
      <Modal opened={opened} onClose={close}>
        {formType === 'login' ? (
          <>
            <TextInput label="Email" required placeholder="hello@gluesticker.com" />
            <PasswordInput label="Contraseña" required />
            <Group justify="space-between" mt="xl">
              <Button onClick={close}>Iniciar sesión</Button>
            </Group>
          </>
        ) : (
          <>
            {/* TODO: if its possible */}
            {/* <TextInput label="Email" required placeholder="hello@gluesticker.com" />
            <PasswordInput label="Contraseña" required />
            <Group justify="space-between" mt="xl">
              <Anchor
                component="button"
                type="button"
                c="dimmed"
                onClick={toggleFormType}
                size="sm"
              >
                ¿No tiene cuenta? Registrese
              </Anchor>
              <Button onClick={close}>Registrese</Button>
            </Group> */}
          </>
        )}
      </Modal>
    </>
  );
}
