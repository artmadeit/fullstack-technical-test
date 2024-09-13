"use client"
import { IconPlus } from '@tabler/icons-react';
import { Button, Group, LoadingOverlay, Modal, Radio, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export default function AnimalListPage() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      close()
    }, 3000);
  };

  return (
    <>
      <Group justify="space-between">
        <Title order={1}>Animales</Title>
        <Button rightSection={<IconPlus />} onClick={toggle}>Registrar nuevo</Button>
      </Group>
      <Modal opened={opened} onClose={close}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading} />
          <TextInput label="Nombre" required placeholder="Tomy" />
          <TextInput label="Edad" required placeholder="e.g. 1 año o 1 año con 7 meses" />
          <Radio.Group
            name="type"
            label="Tipo"
            withAsterisk
          >
            <Group mt="xs">
              <Radio value="DOG" label="Perro" />
              <Radio value="CAT" label="Gato" />
            </Group>
          </Radio.Group>
          <TextInput label="Raza" required placeholder="Golden Retriever" />
          <Group justify="space-between" mt="xl">
            <Button type="submit">Guardar</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
