'use client';

import { useState } from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Radio,
  Stack,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { DeleteConfirmationModal } from '@/components/ConfirmationModal/DeleteConfirmationModal';

type Animal = {
  id: number;
  name: string;
  age: string;
  type: string;
  breed: string;
  status: string;
};

export default function AnimalListPage() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: '',
      age: '',
      type: '',
      breed: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Animal | null>();

  const rows = [
    {
      id: 1,
      name: 'Tomy',
      age: '7 años',
      type: 'DOG',
      breed: 'Pekines',
      status: 'ADOPTED', // TODO: ADOPTED, IN_ADOPTION, AWAITING_ADOPTION
    },
  ].map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Anchor component="button" fz="sm" onClick={() => toggle()}>
          {element.name}
        </Anchor>
      </Table.Td>
      <Table.Td>{element.age}</Table.Td>
      <Table.Td>
        {element.type === 'DOG' ? 'Perro' : 'Gato'} {element.breed}
      </Table.Td>
      <Table.Td>{element.status === 'ADOPTED' ? 'Adoptado' : 'En adopción'}</Table.Td>
      <Table.Td>
        <ActionIcon
          variant="default"
          aria-label="Settings"
          onClick={() => {
            setItemToDelete(element);
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group justify="space-between">
        <Title order={1}>Animales</Title>
        <Button rightSection={<IconPlus />} onClick={toggle}>
          Registrar nuevo
        </Button>
      </Group>
      <Table mt={4}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Edad</Table.Th>
            <Table.Th>Raza</Table.Th>
            <Table.Th>Estado</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Modal opened={opened} onClose={close}>
        <form
          onSubmit={form.onSubmit((values) => {
            setLoading(true);
            setTimeout(() => {
              console.log(values);
              setLoading(false);
              close();
            }, 3000);
          })}
        >
          <LoadingOverlay visible={loading} />
          <Stack>
            <TextInput label="Nombre" required placeholder="Tomy" {...form.getInputProps('name')} />
            <TextInput
              label="Edad"
              required
              placeholder="e.g. 1 año o 1 año con 7 meses"
              {...form.getInputProps('age')}
            />
            <Radio.Group name="type" label="Tipo" withAsterisk {...form.getInputProps('type')}>
              <Group mt="xs">
                <Radio value="DOG" label="Perro" />
                <Radio value="CAT" label="Gato" />
              </Group>
            </Radio.Group>
            <TextInput
              label="Raza"
              required
              placeholder="Golden Retriever"
              {...form.getInputProps('breed')}
            />
            <Group justify="space-between" mt="xl">
              <Button type="submit">Guardar</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <DeleteConfirmationModal
        opened={Boolean(itemToDelete)}
        onCancel={() => setItemToDelete(null)}
        onConfirm={() => {
          // DELETE
          setItemToDelete(null);
        }}
      />
    </>
  );
}
