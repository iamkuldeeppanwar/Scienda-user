import React from 'react'
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import './MyAccount.css';
import ModuleLayout from '../../../layout/ModuleLayout';
import { PasswordLockIcon, ProfileIcon, UploadIcon } from './components/my-account-icons';

const MyAccount = () => {
    return (
        <ModuleLayout>
            <h3 className='text-36 font-semibold text-color-secondary'>My Account</h3>

            <div className='px-3 py-4 account-details-container'>
                <div className='form-container'>
                    <Form>
                        <div className='d-flex align-items-center column-gap-3'>
                            <span><ProfileIcon /></span>
                            <p className='m-0 text-18 font-semibold'>Account Details</p>
                        </div>

                        <div className='ps-5'>
                            <Stack className='input-layout' direction='horizontal' gap={4} >
                                <Form.Group className="my-3 flex-grow-1" >
                                    <Form.Label className='text-14 font-normal'>First Name</Form.Label>
                                    <Form.Control className='py-2 px-3' type="text" value="John" />
                                </Form.Group>
                                <Form.Group className="my-3 flex-grow-1"  >
                                    <Form.Label className='text-14 font-normal'>Last Name</Form.Label>
                                    <Form.Control className='py-2 px-3' type="text" value="Patil" />
                                </Form.Group>
                            </Stack>
                            <Stack className='input-layout' direction='horizontal' gap={4} >
                                <Form.Group className="my-3 flex-grow-1" >
                                    <Form.Label className='text-14 font-normal'>Phone No.</Form.Label>
                                    <Form.Control className='py-2 px-3' type="text" value="+ 44 8089876542" />
                                </Form.Group>
                                <Form.Group className="my-3 flex-grow-1" >
                                    <Form.Label className='text-14 font-normal'>Email Address</Form.Label>
                                    <Form.Control className='py-2 px-3' type="email" value="Johnpatil@gmail.com" />
                                </Form.Group>
                            </Stack>
                            <Stack className='input-layout' direction='horizontal' gap={4} >
                                <Form.Group className="my-3 flex-grow-1" >
                                    <Form.Label className='text-14 font-normal'>DOB</Form.Label>
                                    <Form.Control className='py-2 px-3' type="text" value="25/12/1996" />
                                </Form.Group>
                                <Form.Group className="my-3 flex-grow-1 invisible" >
                                    <Form.Label className='text-14 font-normal'>DOB</Form.Label>
                                    <Form.Control className='py-2 px-3' type="text" value="25/12/1996" />
                                </Form.Group>
                            </Stack>
                        </div>

                        <div className='d-flex justify-content-end align-items-center column-gap-3 my-3'>
                            <button 
                                className='rounded-lg bg-white text-color-primary text-16 font-normal'
                                style={{
                                    width: '9.2rem', 
                                    height: '3rem', 
                                    border: '1px solid var(--primary-color)',
                                    boxShadow: '0px 1px 2px 0px #1018280D'
                                }} 
                            >Cancel</button>
                            <button
                                className='rounded-lg bg-color-primary text-white text-16 font-bold'
                                style={{
                                    width: '9.2rem', 
                                    height: '3rem', 
                                    border: '1px solid var(--primary-color)',
                                    boxShadow: '0px 1px 2px 0px #1018280D'
                                }}
                            >Save Changes</button>
                        </div>
                    </Form>
                </div>
                <div className='d-flex flex-grow-1 justify-content-center align-items-center' style={{ marginBottom: '6rem'}}>
                    <div
                        className='rounded-xl'
                        style={{
                            width: '150px',
                            height: '220px',
                            border: '0.4px solid #00000038'
                        }}
                    >
                        <div className='bg-white rounded-xl w-100'>
                            <h5 
                                className='mx-auto pt-1 text-14 font-bold text-color-secondary text-center w-70'
                            >Upload Profile Picture</h5>
                            <div className='text-center'>
                                <img src="/images/myaccount-profile.png" alt="myaccount-profile" />
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#F1F1F1', marginTop: '-1rem' }} className='pt-4 w-100'>
                            <p className=' text-12 font-bold text-center'>
                                SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>
                            <Stack className='d-flex justify-content-center' direction='horizontal' gap={2}>
                                <a href="#" className='text-12 font-bold text-color-secondary' >Click to upload</a>
                                <span><UploadIcon /></span>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>


            <div className='px-3 py-4 account-details-container'>
                <div className='form-container'>
                <Form>
                        <div className='d-flex align-items-center column-gap-3'>
                            <span><PasswordLockIcon /></span>
                            <p className='m-0 text-18 font-semibold'>Password & Security</p>
                        </div>

                        <div className='ps-5'>
                            <Stack className='input-layout' direction='horizontal' gap={4} >
                                <Form.Group className="my-3 flex-grow-1" >
                                    <Form.Label className='text-14 font-normal'>Current Password</Form.Label>
                                    <Form.Control className='py-2 px-3' type="text" value="**********" />
                                </Form.Group>
                            </Stack>
                            <Stack className='input-layout' direction='horizontal' gap={4} >
                                <Form.Group className="my-3 flex-grow-1" >
                                    <Form.Label className='text-14 font-normal'>New Password</Form.Label>
                                    <Form.Control className='py-2 px-3 text-black' type="text" value="**********" />
                                </Form.Group>
                                <Form.Group className="my-3 flex-grow-1" >
                                    <Form.Label className='text-14 font-normal'>Confirm New Password</Form.Label>
                                    <Form.Control className='py-2 px-3' type="text" value="**********" />
                                </Form.Group>
                            </Stack>
                        </div>

                        <div className='d-flex justify-content-end align-items-center column-gap-3 my-3'>
                            <button 
                                className='rounded-lg bg-white text-color-primary text-16 font-normal'
                                style={{
                                    width: '9.2rem', 
                                    height: '3rem', 
                                    border: '1px solid var(--primary-color)',
                                    boxShadow: '0px 1px 2px 0px #1018280D'
                                }} 
                            >Cancel</button>
                            <button
                                className='rounded-lg bg-color-primary text-white text-16 font-bold'
                                style={{
                                    width: '9.2rem', 
                                    height: '3rem', 
                                    border: '1px solid var(--primary-color)',
                                    boxShadow: '0px 1px 2px 0px #1018280D'
                                }}
                            >Save Changes</button>
                        </div>
                    </Form>
                </div>
                <div className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <div
                        className='rounded-xl px-3 py-4 bg-white'
                        style={{
                            width: '370px',
                            border: '0.4px solid #00000038'
                        }}
                    >
                        <h5 className='text-16 font-bold'>About Me..!</h5>
                        <hr />
                        <ul>
                            <li className='text-14 my-2 font-light'>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.
                            </li>
                            <li className='text-14 my-2 font-light'>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.
                            </li>
                            <li className='text-14 my-2 font-light'>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.
                            </li>
                            <li className='text-14 my-2 font-light'>
                            It is a long established fact that a reader will be distracted by the readable content of a layout. The point of using Lorem Ipsum is that it has a <span className='font-medium'>... Read More</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            
        </ModuleLayout>
    )
}

export default MyAccount;