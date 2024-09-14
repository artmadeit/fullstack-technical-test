import { Button, Modal } from '@mantine/core';

type DeleteConfirmationModalProps = {
  opened: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({ opened, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <>
      <Modal opened={opened} onClose={onCancel} title="¿Está seguro que desea eliminar el registro?">
        <Button onClick={onConfirm}>Confirmar</Button>
      </Modal>
    </>
  );
}