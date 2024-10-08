'use client';

import { useState } from 'react';
import { IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import useSWR from 'swr';
import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Radio,
  Select,
  Stack,
  Table,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DeleteConfirmationModal } from '@/components/ConfirmationModal/DeleteConfirmationModal';
import { Animal } from '../animals/page';
import { api } from '../api';
import { fullName, User } from '../volunteers/UserListPage';

type AdoptionFormValues = {
  createdAt: Date;
  animal?: number;
  volunteer?: number;
  adopter?: number;
  status: 'FINISHED' | 'IN_PROCESS';
};

type Adoption = {
  id: number;
  createdAt: string;
  animal: Animal;
  volunteer: User;
  adopter: User;
  status: 'FINISHED' | 'IN_PROCESS';
};

const emptyAdoption: AdoptionFormValues = {
  createdAt: new Date(),
  status: 'FINISHED',
};

export default function AdoptionListPage() {
  const [itemToDelete, setItemToDelete] = useState<Adoption | null>();
  const [itemSelected, setItemSelected] = useState<Adoption | AdoptionFormValues | null>();
  const { data, isLoading, mutate } = useSWR<Adoption[]>('/adoptions');

  const close = () => setItemSelected(null);

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <ActionIcon variant="default" aria-label="Ver más" onClick={() => setItemSelected(element)}>
          <IconSearch />
        </ActionIcon>
      </Table.Td>
      <Table.Td>{element.animal.name}</Table.Td>
      <Table.Td>{fullName(element.adopter)}</Table.Td>
      <Table.Td>{fullName(element.volunteer)}</Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
      <Table.Td>{element.status === 'FINISHED' ? 'Finalizado' : 'En progreso'}</Table.Td>
      <Table.Td>
        <ActionIcon
          variant="default"
          aria-label="Eliminar"
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
        <Title order={1}>Adopciones</Title>
        <Button rightSection={<IconPlus />} onClick={() => setItemSelected(emptyAdoption)}>
          Registrar nuevo
        </Button>
      </Group>
      <Table mt={4}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Animal</Table.Th>
            <Table.Th>Adoptante</Table.Th>
            <Table.Th>Voluntario</Table.Th>
            <Table.Th>Fecha</Table.Th>
            <Table.Th>Estado</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Modal opened={Boolean(itemSelected)} onClose={close}>
        {itemSelected && (
          <AdoptionForm
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
            await api.delete(`adoptions/${itemToDelete.id}/`);
            setItemToDelete(null);
            mutate();
          }
        }}
      />
    </>
  );
}

function AdoptionForm({
  initialValues,
  onComplete,
}: {
  initialValues: Adoption | AdoptionFormValues;
  onComplete: () => void;
}) {
  const form = useForm({
    initialValues,
  });
  const [loading, setLoading] = useState(false);
  const { data: animals } = useSWR<Animal[]>('/animals');
  const { data: adopters } = useSWR<User[]>('/adoptions/users/?role=ADOPTER');
  const { data: volunteers } = useSWR<User[]>('/adoptions/users?role=VOLUNTEER');

  if (!animals) return <LoadingOverlay visible={loading} />;
  if (!adopters) return <LoadingOverlay visible={loading} />;
  if (!volunteers) return <LoadingOverlay visible={loading} />;

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        setLoading(true);
        if ('id' in initialValues) {
          await api.put(`adoptions/${initialValues.id}/`, values);
        } else {
          await api.post('adoptions/', values);
        }
        setLoading(false);
        onComplete();
      })}
    >
      <LoadingOverlay visible={loading} />
      <Stack>
        <Select
          label="Escoge tu mascota"
          searchable
          data={animals.map((animal) => ({
            value: animal.id.toString(),
            label: animal.name,
          }))}
        />
        <Select
          label="Escoge al adoptante"
          searchable
          data={adopters.map((adopter) => ({
            value: adopter.id.toString(),
            label: adopter.firstName,
          }))}
        />
        <Select
          label="Escoge al voluntario"
          searchable
          data={volunteers.map((volunteer) => ({
            value: volunteer.id.toString(),
            label: volunteer.firstName,
          }))}
        />
        <Radio.Group required label="Status" {...form.getInputProps('status')}>
          <Group mt="xs">
            <Radio value="FINISHED" label="Finalizado" />
            <Radio value="IN_PROCESS" label="En progreso" />
          </Group>
        </Radio.Group>
        <Group justify="space-between" mt="xl">
          <Button type="submit">Guardar</Button>
        </Group>
      </Stack>
    </form>
  );
}
