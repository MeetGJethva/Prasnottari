import React from "react";
import { Modal, Box } from "@mui/material";

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      onClose={onClose}
      open={isOpen}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, bgcolor: "background.paper", borderRadius: "12px", boxShadow: 24, p: 4 }}>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
