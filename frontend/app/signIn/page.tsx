'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { signIn } from "next-auth/react"

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Center h="100vh">
      <form onSubmit={form.onSubmit((values) => {
        setLoading(true);
        setError(null);
        signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/animals"
        })
      })}>
        <Stack w="70vh">
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
          <Button type="submit">Iniciar sesión</Button>
        </Stack>
      </form>
    </Center>

  );
}