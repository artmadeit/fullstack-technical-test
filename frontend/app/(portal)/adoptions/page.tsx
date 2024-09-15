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
import { api } from '../api';
import { fullName, User } from '../volunteers/UserListPage';
import { Animal } from '../animals/page';

type AdoptionFormValues = {
  createdAt: Date;
  animalId?: number;
  volunteerId?: number;
  adopterId?: number;
  status: "FINISHED" | "IN_PROCESS";
};

type Adoption = {
  id: number;
  createdAt: string;
  animal: Animal;
  volunteer: User;
  adopter: User;
  status: "FINISHED" | "IN_PROCESS";
};

const emptyAdoption: AdoptionFormValues = {
  createdAt: new Date(),
  status: "FINISHED"
};

export default function AdoptionListPage() {
  const [itemToDelete, setItemToDelete] = useState<Adoption | null>();
  const [itemSelected, setItemSelected] = useState<Adoption | AdoptionFormValues | null>();
  const { data, isLoading, mutate } = useSWR<Adoption[]>('/adoptions')

  const close = () => setItemSelected(null)

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />
  }

  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Anchor component="button" fz="sm" onClick={() => setItemSelected(element)}>
          {element.animal.name}
        </Anchor>
      </Table.Td>
      <Table.Td>{fullName(element.adopter)}</Table.Td>
      <Table.Td>{fullName(element.volunteer)}</Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
      <Table.Td>{element.status === 'FINISHED' ? 'Finalizado' : 'En progreso'}</Table.Td>
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
        <Title order={1}>Adopciones</Title>
        <Button rightSection={<IconPlus />} onClick={() => setItemSelected(emptyAdoption)}>
          Registrar nuevo
        </Button>
      </Group>
      <Table mt={4}>
        <Table.Thead>
          <Table.Tr>
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
        {itemSelected &&
          <AdoptionForm
            initialValues={itemSelected}
            onComplete={() => {
              close()
              mutate()
            }} />}
      </Modal>
      <DeleteConfirmationModal
        opened={Boolean(itemToDelete)}
        onCancel={() => setItemToDelete(null)}
        onConfirm={async () => {
          if(itemToDelete) {
            await api.delete(`adoptions/${itemToDelete.id}/`)
            setItemToDelete(null);
            mutate()
          }
        }}
      />
    </>
  );
}

function AdoptionForm({ initialValues, onComplete }: {
  initialValues: Adoption | AdoptionFormValues,
  onComplete: () => void
}) {
  const form = useForm({
    initialValues,
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        setLoading(true);
        if ("id" in initialValues) {
          await api.put(`adoptions/${initialValues.id}/`, values)
        } else {
          await api.post("adoptions/", values)
        }
        setLoading(false);
        onComplete()
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
        <Radio.Group required name="type" label="Tipo"  {...form.getInputProps('type')}>
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
