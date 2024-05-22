import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { InProgressIcon, FlyingArrowIcon } from './components/tickets-icons';


const TicketChat = () => {
    return (
        <div>
            <div className='p-4 bg-color-light d-flex justify-content-between sticky-top'>
                <div>
                    <p className='text-16 font-medium'>Topic Name: <span className='text-14 font-semibold' style={{ color: '#525252' }}>Control Engineering</span></p>
                    <p className='text-16 font-medium'>Title: <span className='text-14 font-semibold' style={{ color: '#525252' }}>Doubts related about topics</span></p>
                    <p className='text-16 font-medium'>
                        Description:
                        <span className='text-14 font-normal ms-2' style={{ color: '#525252' }}>
                            How to Gain access to a comprehensive set of features designed to maximize your learning potential. ?
                        </span>
                    </p>
                </div>
                <div className='d-flex flex-column justify-content-between'>
                    <div className='text-end text-16'>
                        <p className='my-0 font-semibold'>Raised On: <span className='text-color-secondary'>24 Dec 2023</span></p>
                        <p className='my-0 font-normal'>7:30 PM</p>
                    </div>
                    <p className='text-end text-12 font-normal text-color-progress'>In Progress <InProgressIcon /></p>
                </div>
            </div>

            <div className='p-4'>
                <div className='p-3 pt-5 bg-white rounded-xl'
                    style={{
                        border: '1px solid #EFEFEF',
                        boxShadow: '0px 4px 12px 0px #0000000A'
                    }}
                >
                    <div className='d-flex flex-row-reverse'>
                        <img src="/images/ticket-profile1.png" style={{ height: '3rem', width: '3rem' }} alt="ticket-profile1" />
                        <div className='me-2' style={{ width: '35%', minWidth: '24rem' }}>
                            <p className='my-0 p-4'
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 400,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: '22px',
                                    borderTopRightRadius: '4px'
                                }}
                            >Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. </p>
                            <p className='my-1 text-end'
                                style={{
                                    fontWeight: 400,
                                    fontSize: '0.75rem',
                                    color: '#797979'
                                }}
                            >Sent at : <span style={{ fontWeight: 300 }}>11 Nov 2022, 1:09 PM</span></p>
                        </div>
                    </div>

                    <div className='d-flex flex-row'>
                        <img src="/images/ticket-profile2.png" style={{ height: '3rem', width: '3rem' }} alt="ticket-profile2" />
                        <div className='ms-2' style={{ width: '35%', minWidth: '24rem' }}>
                            <p className='my-0 p-4'
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 400,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: '22px',
                                    borderTopLeftRadius: '4px'
                                }}
                            >Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. </p>
                            <p className='my-1 text-start'
                                style={{
                                    fontWeight: 400,
                                    fontSize: '0.75rem',
                                    color: '#797979'
                                }}
                            >Sent at : <span style={{ fontWeight: 300 }}>11 Nov 2022, 1:09 PM</span></p>
                        </div>
                    </div>
                    <div className='d-flex flex-row-reverse'>
                        <img src="/images/ticket-profile1.png" style={{ height: '3rem', width: '3rem' }} alt="ticket-profile1" />
                        <div className='me-2' style={{ width: '35%', minWidth: '24rem' }}>
                            <p className='my-0 p-4'
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 400,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: '22px',
                                    borderTopRightRadius: '4px'
                                }}
                            >Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. </p>
                            <p className='my-1 text-end'
                                style={{
                                    fontWeight: 400,
                                    fontSize: '0.75rem',
                                    color: '#797979'
                                }}
                            >Sent at : <span style={{ fontWeight: 300 }}>11 Nov 2022, 1:09 PM</span></p>
                        </div>
                    </div>

                    <div className='d-flex flex-row'>
                        <img src="/images/ticket-profile2.png" style={{ height: '3rem', width: '3rem' }} alt="ticket-profile2" />
                        <div className='ms-2' style={{ width: '35%', minWidth: '24rem' }}>
                            <p className='my-0 p-4'
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 400,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: '22px',
                                    borderTopLeftRadius: '4px'
                                }}
                            >Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. </p>
                            <p className='my-1 text-start'
                                style={{
                                    fontWeight: 400,
                                    fontSize: '0.75rem',
                                    color: '#797979'
                                }}
                            >Sent at : <span style={{ fontWeight: 300 }}>11 Nov 2022, 1:09 PM</span></p>
                        </div>
                    </div>
                    <div className='d-flex flex-row-reverse'>
                        <img src="/images/ticket-profile1.png" style={{ height: '3rem', width: '3rem' }} alt="ticket-profile1" />
                        <div className='me-2' style={{ width: '35%', minWidth: '24rem' }}>
                            <p className='my-0 p-4'
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 400,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: '22px',
                                    borderTopRightRadius: '4px'
                                }}
                            >Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. </p>
                            <p className='my-1 text-end'
                                style={{
                                    fontWeight: 400,
                                    fontSize: '0.75rem',
                                    color: '#797979'
                                }}
                            >Sent at : <span style={{ fontWeight: 300 }}>11 Nov 2022, 1:09 PM</span></p>
                        </div>
                    </div>

                    <div className='d-flex flex-row'>
                        <img src="/images/ticket-profile2.png" style={{ height: '3rem', width: '3rem' }} alt="ticket-profile2" />
                        <div className='ms-2' style={{ width: '35%', minWidth: '24rem' }}>
                            <p className='my-0 p-4'
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 400,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: '22px',
                                    borderTopLeftRadius: '4px'
                                }}
                            >Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. </p>
                            <p className='my-1 text-start'
                                style={{
                                    fontWeight: 400,
                                    fontSize: '0.75rem',
                                    color: '#797979'
                                }}
                            >Sent at : <span style={{ fontWeight: 300 }}>11 Nov 2022, 1:09 PM</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <section className='sticky-bottom px-4 py-3 z-3'>
                <div className='bg-white py-3 rounded-xl'>

                <Form.Group className='w-75 mx-auto'>
                    <Stack direction='horizontal' gap={3}>
                        <Form.Control
                            // disabled={currentTicket[0].status === 'Closed'}
                            type="text"
                            placeholder="Write something here..."
                            className='py-2 px-3'
                            style={{
                                border: '1px solid #8098F9'
                            }}
                        />
                        <Button
                            style={{
                                backgroundColor: 'var(--primary-color)',
                                border: 'none',
                                minWidth: 'max-content',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '0.75rem'
                            }}
                        >
                            <span className='me-2'>Send</span>
                            <FlyingArrowIcon />
                        </Button>
                    </Stack>
                </Form.Group>
                </div>
            </section>
        </div>
    )
}

export default TicketChat