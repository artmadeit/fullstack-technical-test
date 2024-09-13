import { Button, Group, Title } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';

export default function AnimalListPage() {
  return (
    <>
      <Group justify="space-between">
        <Title order={1}>
          Animales
        </Title>
        <Button rightSection={<IconPlus />}>Registrar nuevo</Button>
      </Group>
      
    </>
  );
}
