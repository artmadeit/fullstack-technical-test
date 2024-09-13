import { IconPlus } from '@tabler/icons-react';
import { Button, Group, Title } from '@mantine/core';

export default function AnimalListPage() {
  return (
    <>
      <Group justify="space-between">
        <Title order={1}>Animales</Title>
        <Button rightSection={<IconPlus />}>Registrar nuevo</Button>
      </Group>
    </>
  );
}
