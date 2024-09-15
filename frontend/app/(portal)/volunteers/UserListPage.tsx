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
  PasswordInput,
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

type Role = "VOLUNTEER" | "ADOPTER"

type UserFormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
};

export function fullName(user: User) {
  return user.firstName + " " + user.lastName
}

export type User = Omit<UserFormValues, "password"> & {
  id: number;
  isActive: boolean;
  role: Role
};

const emptyItem: UserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

export function UserListPage({ role }: { role: Role }) {
  const [itemToDelete, setItemToDelete] = useState<User | null>();
  const [itemSelected, setItemSelected] = useState<User | UserFormValues | null>();
  const { data, isLoading, mutate } = useSWR<User[]>(`/adoptions/users?role=${role}`)

  const close = () => setItemSelected(null)

  return (
    <>
      <Group justify="space-between">
        <Title order={1}>{role === "ADOPTER" ? "Adoptantes" : "Voluntarios"}</Title>
        <Button rightSection={<IconPlus />} onClick={() => setItemSelected(emptyItem)}>
          Registrar nuevo
        </Button>
      </Group>
      {
        (isLoading) ?
          <LoadingOverlay visible={isLoading} />
          : <Table mt={4}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nombre completo</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{
              data?.map((element) => (
                <Table.Tr key={element.id}>
                  <Table.Td>
                    <Anchor component="button" fz="sm" onClick={() => setItemSelected(element)}>
                      {fullName(element)}
                    </Anchor>
                  </Table.Td>
                  <Table.Td>{element.email}</Table.Td>
                  <Table.Td>
                    {element.isActive ? 'Active' : 'Inactivo'}
                  </Table.Td>
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
              ))
            }</Table.Tbody>
          </Table>
      }
      <Modal opened={Boolean(itemSelected)} onClose={close}>
        {itemSelected &&
          <UserForm
            role={role}
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
          if (itemToDelete) {
            await api.delete(`adoptions/users/${itemToDelete.id}/`)
            setItemToDelete(null);
            mutate()
          }
        }}
      />
    </>
  );
}

function UserForm({ initialValues, onComplete, role }: {
  initialValues: User | UserFormValues,
  onComplete: () => void,
  role: Role
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
          await api.put(`adoptions/users/${initialValues.id}/`, { ...values, role })
        } else {
          await api.post("adoptions/users/", { ...values, role })
        }
        setLoading(false);
        onComplete()
      })}
    >
      <LoadingOverlay visible={loading} />
      <Stack>
        <TextInput label="Nombre" required {...form.getInputProps('firstName')} />
        <TextInput label="Apellido" required {...form.getInputProps('lastName')} />
        <TextInput
          label="Email"
          required
          type="email"
          placeholder="hello@gluesticker.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput label="Contraseña" required {...form.getInputProps('password')} />
        <Group justify="space-between" mt="xl">
          <Button type="submit">Guardar</Button>
        </Group>
      </Stack>
    </form>
  );
}
