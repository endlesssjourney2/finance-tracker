import { Backdrop, Modal, Zoom } from "@mui/material";
import { type FC, type ReactNode } from "react";
import s from "./ModalComponent.module.css";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  content: ReactNode;
};

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ModalComponent: FC<ModalProps> = ({ open, onClose, content }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 250,
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
        sx={style}
      >
        <Zoom in={open} timeout={250} style={{ zIndex: 1500 }}>
          <div className={s.modalBox} onClick={(e) => e.stopPropagation()}>
            {content}
          </div>
        </Zoom>
      </Modal>
    </>
  );
};

export default ModalComponent;
