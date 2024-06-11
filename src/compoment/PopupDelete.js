import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


function PopupDelete(props) {
    const { open, handleClose, id } = props;

    async function setStatusCancelOrder() {
        const response = await axios.put(`http://localhost:8080/api/order/status/${id}/3`);
        toast.success("Hủy thành công")
    }

    return (
        <>
            <Modal
                show={open}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Huỷ đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn hủy đơn không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => { setStatusCancelOrder().then(handleClose) }}>Có</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupDelete;