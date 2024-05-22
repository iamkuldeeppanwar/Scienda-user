import React from 'react'
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';

import './Tickets.css'
import ModuleLayout from '../../../layout/ModuleLayout'
import { InProgressIcon, IssueResolvedIcon, PaperClipIcon, RightArrowOutlinedIcon, UnResolvedIcon } from './components/tickets-icons';
import CreateTicketSuccessModal from './components/CreateTicketSuccessModal';

const Tickets = () => {
    return (
        <ModuleLayout>
            <div className='px-3 py-3'>
                <h3 className='text-36 font-semibold text-color-secondary'>Manage Tickets</h3>

                <div className='d-flex justify-content-between align-items-center my-4'>
                    <h5 className='text-22 font-medium'>My Tickets</h5>
                    <Link to='view-all' className='text-decoration-none'>
                        <p className='m-0 text-16 font-medium text-color-primary d-flex align-items-center gap-2'>View All <span><RightArrowOutlinedIcon /></span></p>
                    </Link>
                </div>

                <div className='d-flex gap-2'>
                    <div
                        className='px-2 pt-2 rounded-xl bg-white d-flex flex-column justify-content-between'
                        style={{
                            border: '1px solid #EFEFEF',
                            boxShadow: '0px 4px 12px 0px #0000000A',
                            width: '273px',
                            height: '151px'
                        }}
                    >
                        <p className='text-center text-12 font-normal' style={{ color: '#475467' }}>Mon, 11 Nov 2023</p>
                        <p className='w-85 mx-auto text-center text-14 font-medium' style={{ color: '#525252' }}>
                            Which of the following drugs is a beta-blocker commonly used in the treatment of hypertension?
                        </p>
                        <div className='mb-1 d-flex justify-content-end align-items-center gap-1'>
                            <span className='text-12 font-normal text-color-secondary'>Issue Resolved</span>
                            <span className=''><IssueResolvedIcon /> </span>
                        </div>
                    </div>
                    <div
                        className='px-2 pt-2 rounded-xl bg-white d-flex flex-column justify-content-between'
                        style={{
                            border: '1px solid #EFEFEF',
                            boxShadow: '0px 4px 12px 0px #0000000A',
                            width: '273px',
                            height: '151px'
                        }}
                    >
                        <p className='text-center text-12 font-normal' style={{ color: '#475467' }}>Mon, 11 Nov 2023</p>
                        <p className='w-85 mx-auto text-center text-14 font-medium' style={{ color: '#525252' }}>
                            Issues with page loading or content not displaying correctly
                        </p>
                        <div className='mb-1 d-flex justify-content-end align-items-center gap-1'>
                            <span className='text-12 font-normal text-color-secondary'>Issue Resolved</span>
                            <span className=''><IssueResolvedIcon /> </span>
                        </div>
                    </div>
                    <div
                        className='px-2 pt-2 rounded-xl bg-white d-flex flex-column justify-content-between'
                        style={{
                            border: '1px solid #EFEFEF',
                            boxShadow: '0px 4px 12px 0px #0000000A',
                            width: '273px',
                            height: '151px'
                        }}
                    >
                        <p className='text-center text-12 font-normal' style={{ color: '#475467' }}>Mon, 11 Nov 2023</p>
                        <p className='w-85 mx-auto text-center text-14 font-medium' style={{ color: '#525252' }}>
                            Reporting inaccuracies in questions or answers
                        </p>
                        <div className='mb-1 d-flex justify-content-end align-items-center gap-1'>
                            <span className='text-12 font-normal text-color-progress'>In Progress</span>
                            <span className=''><InProgressIcon /> </span>
                        </div>
                    </div>
                    <div
                        className='px-2 pt-2 rounded-xl bg-white d-flex flex-column justify-content-between'
                        style={{
                            border: '1px solid #EFEFEF',
                            boxShadow: '0px 4px 12px 0px #0000000A',
                            width: '273px',
                            height: '151px'
                        }}
                    >
                        <p className='text-center text-12 font-normal' style={{ color: '#475467' }}>Mon, 11 Nov 2023</p>
                        <p className='w-85 mx-auto text-center text-14 font-medium' style={{ color: '#525252' }}>
                            Reporting inaccuracies in questions or answers 
                        </p>
                        <div className='mb-1 d-flex justify-content-end align-items-center gap-1'>
                            <span className='text-12 font-normal text-secondary'>Issue not Resolved</span>
                            <span className=''><UnResolvedIcon /> </span>
                        </div>
                    </div>
                </div>

                <Form className='create-ticket-container mt-4' onSubmit={(e) => e.preventDefault()}>
                    <div className='info'>
                        <h4 className='text-22 font-medium'>Create New Ticket</h4>
                        <p className='text-20 font-light text-black'>
                            Do you want to provide a difficult question from the real exam? We will answer you...
                        </p>
                    </div>
                    <div className="ticket-form">
                        <p className='text-14 font-medium'>Topic: <span className='font-light'>Control Engineering</span></p>
                        <p className='text-14 font-medium'>Subject: <span className='font-light'>Issues with page loading or content not displaying correctly</span></p>
                        <Form.Group className="text-14 font-medium">
                            <Form.Label>Describe your issue</Form.Label>
                            <Form.Control as="textarea" placeholder='Describe in detail, please...' className='text-12 font-light' rows={7} />
                        </Form.Group>

                        <div className='d-flex justify-content-between align-items-center mt-4'>
                            <Stack direction='horizontal'>
                                <p className='m-0 ' style={{ fontSize: '11px', width: '9rem' }}>Max 6MB each supported types, png, Jpg, Pdf, doc.</p>
                                <button
                                    className=''
                                    style={{
                                        width: '5.75rem',
                                        height: '1.5rem',
                                        backgroundColor: '#DDDDDD',

                                        fontSize: '11px',
                                        fontWeight: 300,
                                        border: 'none'
                                    }}
                                >
                                    Choose File
                                    <span><PaperClipIcon /></span>
                                </button>
                            </Stack>

                            <CreateTicketSuccessModal />
                        </div>
                    </div>
                </Form>
            </div>
        </ModuleLayout>
    )
}

export default Tickets