import React from "react";
import { Modal, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";

type LoadingModalProps = {
  isLoading: boolean;
};

const LoadingModal = ({ isLoading }: LoadingModalProps) => {
  return (
    <Modal isOpen={isLoading} onClose={() => {}} isCentered size="xs">
      <ModalOverlay />
      <ModalContent
        background="transparent"
        boxShadow="none"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color="blue.500" />
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;
