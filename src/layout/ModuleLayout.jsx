import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import './ModuleLayout.css'
import { BellIcon, HelpCircleIcon, ProfileIcon, SearchIcon } from '../components/icons/modulelayout-icons';

const HelpModal = (props) => {
    return (
        <Modal
            show={props.helpModalShow}
            onHide={props.closeHelpModal}
            aria-labelledby="help-modal"
            centered
            className='help-modal'
            size='lg'
        >
            <div className='p-4'>
                <div className='text-center mx-auto text-24 font-semibold text-color-secondary'>
                    Need any help?
                </div>

                <hr />

                <div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className='text-14 font-medium'>FAQ's are listed below</span>
                        <div className='d-flex justify-content-start gap-2 py-1 px-2 rounded-lg'
                            style={{
                                boxShadow: '0px 4px 12px 0px #EEF4FF',
                                border: '0.5px solid #E0EAFF'
                            }}
                        >
                            <span><SearchIcon /></span>
                            <input
                                type="text"
                                placeholder="Search for FAQ's"
                                className='outline-none border-0 text-16 font-normal'
                            />
                        </div>
                    </div>

                    {[...Array(4)].map((num, idx) =>
                        <Accordion key={idx} className='mt-4'>
                            <Accordion.Item eventKey="0" className='rounded-2'>
                                <Accordion.Header className='py-0'>
                                    <p className='text-12 font-semibold m-0 p-0'>
                                        Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur.
                                        Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus.
                                    </p>
                                    <hr />
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p className='text-12' style={{ color: '#424242' }}>
                                        Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus. Lorem ipsum dolor sit amet consectetur. Ante vel et semper lectus.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )}
                </div>
            </div>
        </Modal>
    )
}

const ModuleLayout = ({ children, className, style }) => {
    const [notificationShow, setNotificationShow] = useState(false);
    const [helpModalShow, setHelpModalShow] = useState(false);

    const openNotifications = () => setNotificationShow(true);
    const closeNotifications = () => setNotificationShow(false);

    const openHelpModal = () => setHelpModalShow(true);
    const closeHelpModal = () => setHelpModalShow(false);

    return (
        <div className={className}
            style={{
                width: '100%',
                height: 'max-content',
                padding: '2rem',
                ...style
            }}
        >
            <div className='d-flex justify-content-end gap-3'>
                <div className='bg-white py-1 px-2 rounded-4 d-flex justify-content-center align-items-center gap-1 shadow-sm cursor-pointer' onClick={openHelpModal}>
                    <span className='text-14 text-color-primary font-medium'>Help</span>
                    <HelpCircleIcon />
                </div>

                <HelpModal helpModalShow={helpModalShow} closeHelpModal={closeHelpModal} />

                <span className='cursor-pointer' onClick={openNotifications}>
                    <BellIcon />
                </span>

                <Offcanvas
                    show={notificationShow}
                    placement='end'
                    onHide={closeNotifications}
                    backdrop={true}
                    scroll={true}
                    style={{
                        border: '1px solid #8098F9'
                    }}
                >
                    <Offcanvas.Header className='d-flex justify-content-between my-0 pb-1'>
                        <Offcanvas.Title className='text-22 font-medium'>Notifications</Offcanvas.Title>
                        <button className='text-12 py-1 px-2 rounded bg-white text-color-primary'
                            style={{
                                boxShadow: '0px 4px 4px 0px #0000001F',
                                border: '0.5px solid var(--primary-color)'
                            }}
                        >Clear All</button>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='py-0'>
                        <hr className='' />
                        {[...Array(9)].map((num, idx) => <div key={idx}>
                            <p className='px-2 text-16 font-normal'><span className='me-1'><ProfileIcon /></span> Your profile has changed.</p>
                            <hr />
                        </div>
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            {children}
        </div>
    )
}

export default ModuleLayout;