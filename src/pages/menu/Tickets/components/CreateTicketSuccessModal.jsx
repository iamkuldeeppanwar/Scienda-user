
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import { CreateTicketCheckIcon } from './tickets-icons';

const CreateTicketSuccessModal = ({ }) => {
    const [modalShow, setModalShow] = useState(false);

    const openModal = () => setModalShow(true);
    const closeModal = () => setModalShow(false);

    return (
        <>
            <button className='border-0 rounded-lg bg-color-primary px-3 py-2 text-16 font-bold text-white' onClick={openModal}>
                Create Ticket
            </button>

            <Modal
                show={modalShow}
                onHide={closeModal}
                centered
            >
                <div className='p-5'>
                    <div className='text-center'>
                        <CreateTicketCheckIcon />
                    </div>
                    <p className='text-24 font-semibold text-center' style={{ color: '#111927' }}>
                        You have successfully created ticket
                    </p>
                    <Link to={`/menu/tickets/chat/new`} className='text-center d-block'>
                        <button
                            className='bg-color-primary py-2 px-3 text-white text-16 font-semibold rounded-lg'
                            style={{
                                border: '1px solid var(--primary-color)',
                                boxShadow: '0px 1px 2px 0px #1018280D',
                                width: '263px',
                                height: '56px'
                            }}
                        >
                            View Ticket
                        </button>
                    </Link>
                </div>
            </Modal>
        </>
    )
}

export default CreateTicketSuccessModal;