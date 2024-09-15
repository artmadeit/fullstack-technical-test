'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import classes from './Welcome.module.css';
import { signIn } from "next-auth/react"

export function Welcome() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const formType = 'login';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

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
        <Button onClick={toggle}>Adopte su mascota</Button>
      </Group>
      <Modal opened={opened} onClose={close}>
        {formType === 'login' ? (
          <form onSubmit={form.onSubmit((values) => {
            setLoading(true);
            setError(null);
            signIn("credentials", values)
            router.push("/animals")
            setLoading(false);
          })}>
            <LoadingOverlay visible={loading} />
            <TextInput
              label="Email"
              required
              type="email"
              placeholder="hello@gluesticker.com"
              {...form.getInputProps('email')} />
            <PasswordInput label="Contraseña" required {...form.getInputProps('password')} />
            {error && (
              <Text c="red" size="sm" mt="sm">
                {error}
              </Text>
            )}
            <Group justify="space-between" mt="xl">
              <Button type="submit">Iniciar sesión</Button>
            </Group>
          </form>
        ) : (
          <>
            {/* TODO: can anyone create it's account? */}
          </>
        )}
      </Modal>
    </>
  );
}
