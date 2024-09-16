'use client';

import { useState } from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import useSWR from 'swr';
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
import { api } from '../api';

type AnimalFormValues = {
  name: string;
  age: string;
  type: 'D' | 'C';
  breed: string;
  status: 'AWAITING_ADOPTION' | 'IN_ADOPTION' | 'ADOPTED';
};

export type Animal = AnimalFormValues & {
  id: number;
};

const emptyAnimal: AnimalFormValues = {
  name: '',
  age: '',
  type: 'D',
  breed: '',
  status: 'IN_ADOPTION',
};

export default function AnimalListPage() {
  const [itemToDelete, setItemToDelete] = useState<Animal | null>();
  const [itemSelected, setItemSelected] = useState<Animal | AnimalFormValues | null>();
  const { data, isLoading, mutate } = useSWR<Animal[]>('/animals');

  const close = () => setItemSelected(null);

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
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
        {element.type === 'D' ? 'Perro' : 'Gato'} {element.breed}
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
      <Modal opened={Boolean(itemSelected)} onClose={close}>
        {itemSelected && (
          <AnimalForm
            initialValues={itemSelected}
            onComplete={() => {
              close();
              mutate();
            }}
          />
        )}
      </Modal>
      <DeleteConfirmationModal
        opened={Boolean(itemToDelete)}
        onCancel={() => setItemToDelete(null)}
        onConfirm={async () => {
          if (itemToDelete) {
            await api.delete(`animals/${itemToDelete.id}/`);
            setItemToDelete(null);
            mutate();
          }
        }}
      />
    </>
  );
}

function AnimalForm({
  initialValues,
  onComplete,
}: {
  initialValues: Animal | AnimalFormValues;
  onComplete: () => void;
}) {
  const form = useForm({
    initialValues,
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        setLoading(true);
        if ('id' in initialValues) {
          await api.put(`animals/${initialValues.id}/`, values);
        } else {
          await api.post('animals/', values);
        }
        setLoading(false);
        onComplete();
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
        <Radio.Group required name="type" label="Tipo" {...form.getInputProps('type')}>
          <Group mt="xs">
            <Radio value="D" label="Perro" />
            <Radio value="C" label="Gato" />
          </Group>
        </Radio.Group>
        <Radio.Group required label="Status" {...form.getInputProps('status')}>
          <Group mt="xs">
            <Radio value="AWAITING_ADOPTION" label="En espera de adopción" />
            <Radio value="IN_ADOPTION" label="En adopción" />
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
