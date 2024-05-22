import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import './Tickets.css'
import { CreatePlusIcon, InProgressIcon, IssueResolvedIcon, UnResolvedIcon, PaperClipIcon } from './components/tickets-icons'

function CreateTicketModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            onHide={props.closeCreateTicketModal}
            centered
            show={props.createTicketModalShow}
        >
            <div className=''>
                <Form className='create-ticket-container' onSubmit={(e) => e.preventDefault()}>
                    <div className="ticket-form-modal">
                        <p className='text-22 font-medium'>Topic: <span className='font-light'>Control Engineering</span></p>
                        <p className='text-22 font-medium'>Subject: <span className='font-light'>Issues with page loading or content not displaying correctly</span></p>
                        <Form.Group className="text-22 font-medium">
                            <Form.Label>Describe your issue</Form.Label>
                            <Form.Control as="textarea" placeholder='Describe in detail, please...' className='text-16 font-light' rows={7} />
                        </Form.Group>

                        <div className='d-flex justify-content-between align-items-center mt-4'>
                            <Stack direction='horizontal'>
                                <p className='m-0 text-16' style={{ width: '12rem' }}>Max 6MB each supported types, png, Jpg, Pdf, doc.</p>
                                <button
                                    className=''
                                    style={{
                                        width: '8.75rem',
                                        height: '2.25rem',
                                        backgroundColor: '#DDDDDD',

                                        fontSize: '1rem',
                                        fontWeight: 300,
                                        border: 'none'
                                    }}
                                >
                                    Choose File
                                    <span><PaperClipIcon /></span>
                                </button>
                            </Stack>

                            <button
                                className='border-0 rounded-lg bg-color-primary px-3 py-2 text-22 font-bold text-white'
                                style={{
                                    width: '12rem',
                                    height: '3.5rem'
                                }}
                            >
                                Create Ticket
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}

const CreateTicketButton = () => {
    const [createTicketModalShow, setCreateTicketModalShow] = React.useState(false);

    const openCreateTicketModal = () => setCreateTicketModalShow(true);
    const closeCreateTicketModal = () => setCreateTicketModalShow(false);

    return (
        <>
            <button onClick={openCreateTicketModal} className='border-0 rounded-lg bg-color-primary py-2 px-3 d-flex gap-2'>
                <span><CreatePlusIcon /></span>
                <span className='text-16 font-bold text-white'>Create Ticket</span>
            </button>
            <CreateTicketModal
                createTicketModalShow={createTicketModalShow}
                closeCreateTicketModal={closeCreateTicketModal}
            />
        </>
    )
}

const CURRENT_TICKETS = [
    {
        id: 123,
        topic: 'Control Engineering - Doubts related about topics',
        description: 'How to Gain access to a comprehensive set of features designed to maximize your learning potential. ?',
        date: 'Mon, 11 Nov 2023',
        status: 'RESOLVED'
    },
    {
        id: 234,
        topic: 'Control Engineering - Doubts related about topics',
        description: 'How to Gain access to a comprehensive set of features designed to maximize your learning potential. ?',
        date: 'Mon, 11 Nov 2023',
        status: 'RESOLVED'
    },
    {
        id: 345,
        topic: 'Control Engineering - Doubts related about topics',
        description: 'How to Gain access to a comprehensive set of features designed to maximize your learning potential. ?',
        date: 'Mon, 11 Nov 2023',
        status: 'RESOLVED'
    },
    {
        id: 456,
        topic: 'Control Engineering - Doubts related about topics',
        description: 'How to Gain access to a comprehensive set of features designed to maximize your learning potential. ?',
        date: 'Mon, 11 Nov 2023',
        status: 'PROGRESS'
    },
    {
        id: 567,
        topic: 'Control Engineering - Doubts related about topics',
        description: 'How to Gain access to a comprehensive set of features designed to maximize your learning potential. ?',
        date: 'Mon, 11 Nov 2023',
        status: 'UNRESOLVED'
    },
]

const ViewTickets = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center bg-color-light py-4 px-3'>
                <h3 className='text-36 font-semibold text-color-secondary'>Manage Tickets</h3>
                <CreateTicketButton />
            </div>

            <div className='p-4'>
                <h4 className='text-22 font-medium mb-4'>My Tickets</h4>

                <Stack gap={3}>
                    {CURRENT_TICKETS.map((ticket, idx) => <div
                        key={idx}
                        className='pb-2 pt-3 px-4 bg-white rounded-xl d-flex flex-column cursor-pointer'
                        style={{
                            border: '1px solid #EFEFEF',
                            boxShadow: '0px 4px 12px 0px #0000000A'
                        }}
                        onClick={() => navigate(`/menu/tickets/chat/${ticket.id}`)}
                    >
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='text-14 font-semibold' style={{ color: '#525252' }}>{ticket.topic}</p>

                            {ticket.status === 'RESOLVED' && <p 
                                className='text-color-secondary text-12 font-normal'
                            >Issue Resolved <span><IssueResolvedIcon /></span></p>
                            }

                            {ticket.status === 'PROGRESS' && <p 
                                className='text-color-progress text-12 font-normal'
                            >In Progress <span><InProgressIcon /></span></p>}

                            {ticket.status === 'UNRESOLVED' && <p 
                                className='text-secondary text-12 font-normal'
                            >Issue Not Resolved <span><UnResolvedIcon /></span></p>}
                        </div>
                        <div className='d-flex justify-content-between align-items-start'>
                            <p className='text-14 font-normal' style={{ color: '#525252' }}>
                                {ticket.description}
                            </p>
                            <p className='text-12 font-normal' style={{ color: '#475467' }}>
                                {ticket.date}
                            </p>
                        </div>
                    </div>)}
                </Stack>
            </div>
        </div>
    )
}

export default ViewTickets