import React from "react";
import { Modal } from "react-responsive-modal";

const DeleteAccountModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal open={isOpen} onClose={onClose} center classNames={{ modal: 'rounded-lg', overlay: 'overlay-custom' }}>
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Are you sure you want to delete your account?</h2>
        <div className="flex justify-center">
          <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-600 transition duration-300 ease-in-out">Yes, delete my account</button>
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
