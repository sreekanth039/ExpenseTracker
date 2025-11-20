import styles from "./Modal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalWrapper({ isOpen, setIsOpen, children }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      className={styles.content}
    >
      {children}
    </Modal>
  );
}
