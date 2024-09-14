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
import { DeleteConfirmationModal } from '@/components/ConfirmationModal/DeleteConfirmationModal';
import useSWR from 'swr';

type AnimalFormValues = {
  name: string;
  age: string;
  type: string;
  breed: string;
};

type Animal = AnimalFormValues & {
  id: number;
  status: string;
};

const emptyAnimal = {
  name: '',
  age: '',
  type: '',
  breed: '',
};

export default function AnimalListPage() {
  const [itemToDelete, setItemToDelete] = useState<Animal | null>();
  const [itemSelected, setItemSelected] = useState<Animal | AnimalFormValues | null>();
  const { data, isLoading } = useSWR<Animal[]>('/animals')

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />
  }

  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Anchor component="button" fz="sm" onClick={() => setItemSelected(element)}>
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
        <Button rightSection={<IconPlus />} onClick={() => setItemSelected(emptyAnimal)}>
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
      <Modal opened={Boolean(itemSelected)} onClose={() => setItemSelected(null)}>
        {itemSelected && <AnimalModal initialValues={itemSelected} />}
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

function AnimalModal({ initialValues }: { initialValues: Animal | AnimalFormValues }) {
  const form = useForm({
    initialValues,
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        setLoading(true);
        setTimeout(() => {
          console.log(values);
          setLoading(false);
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
  );
}
