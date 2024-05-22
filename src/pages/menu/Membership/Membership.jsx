import React from 'react'
import Table from 'react-bootstrap/Table';

import './Membership.css'
import ModuleLayout from '../../../layout/ModuleLayout'
import { ViewEyeIcon } from '../Reports/components/reports-icons';
import { CheckCircleIcon, CrownIcon, ViewEyeIcon2 } from './components/membership-icons';

const MembershipCard = ({ price, dayAccess }) => {
    return (
        <div className='rounded-xl bg-white p-0'
            style={{
                border: '1px solid #EAECF0',
                boxShadow: '0px 2.56px 3.85px -1.28px #10182808',
                width: '246px',
                height: '342px'
            }}
        >
            <div style={{ height: '114.27px' }} className='px-4 pt-4 pb-2'>
                <h3 className='font-semibold text-32 text-color-secondary text-center'>{price}</h3>
                <p style={{ color: '#424242' }} className='text-12 font-medium text-center my-0'>{dayAccess} Days Access</p>
            </div>

            <hr className='' />

            <div className='px-3 py-4'>
                <h6 className='text-10 font-semibold' style={{ color: '#101828' }}>FEATURES</h6>

                <div>
                    <p className='d-flex align-items-center gap-2 my-2 text-12 font-normal' style={{ color: '#475467' }}><span><CheckCircleIcon /></span> Full QBank Access</p>
                    <p className='d-flex align-items-center gap-2 my-2 text-12 font-normal' style={{ color: '#475467' }}><span><CheckCircleIcon /></span> 2 -Self Assessments</p>
                    <p className='d-flex align-items-center gap-2 my-2 text-12 font-normal' style={{ color: '#475467' }}><span><CheckCircleIcon /></span> One- Time reset option</p>
                </div>

                <div className='text-center mt-4'>
                    <button className='w-100 border-0 rounded bg-color-primary py-2 text-white text-10 font-semibold'>
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    )
}

const Membership = () => {
    return (
        <ModuleLayout>
            <table className='my-4 w-100'>
                <thead className='p-4 mb-4' style={{ background: '#E5E7EB' }}>
                    <tr className='rounded-xl border'>
                        <th className='text-center border-0'>
                            <div className='p-3 text-20 font-normal'>
                                Plan
                            </div>
                        </th>
                        <th className='text-center border-0'>
                            <div className="p-3 text-20 font-normal">
                                Duration
                            </div>
                        </th>
                        <th className='text-center border-0'>
                            <div className="p-3 text-20 font-normal">
                                Amount
                            </div>
                        </th>
                        <th className='text-center border-0'>
                            <div className="p-3 text-20 font-normal">
                                Payment ID
                            </div>
                        </th>
                        <th className='text-center border-0'>
                            <div className="w-60 mx-auto text-20 font-normal">
                                Payment Date
                            </div>
                        </th>
                        <th className='text-center border-0'>
                            <div className="p-3 text-20 font-normal">
                                Invoice
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    <tr className='border bg-white'>
                        <td className='text-center'>
                            <div className="p-4">
                                <button className='text-14 font-bold bg-color-light border-0 rounded px-3 py-2' style={{ backgroundColor: '#E0EAFF' }}>
                                    Basic Plan
                                </button>
                            </div>
                        </td>
                        <td className='text-center'>
                            <div className="p-4">
                                <span className='text-14 font-bold'>
                                    1 Month
                                </span>
                            </div>
                        </td>
                        <td className='text-center'>
                            <div className="p-4">
                                <span className='text-14 font-bold text-color-secondary'>
                                    ₹ 99 / -
                                </span>
                            </div>
                        </td>
                        <td className='text-center'>
                            <div className="p-4">
                                <a href="" style={{ color: '#565656' }}>pay_Mw5IB2vZPhDMTW</a>
                            </div>
                        </td>
                        <td className='w-15'>
                            <div className="w-80 mx-auto text-12 font-bold text-center px-3 py-3 rounded" style={{ backgroundColor: '#DADADA96' }}>
                                3 Nov, 2023
                            </div>
                        </td>
                        <td className='text-center'>
                            <div className="p-4">
                                <button className='rounded-lg px-3 py-1 border-color-primary bg-white text-color-primary text-14 font-semibold'>
                                    <div>View <ViewEyeIcon2 /></div>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='w-90 mx-auto'>
                <h5 className='text-16 font-medium'>Your Active Plan</h5>
                <div className='px-4 py-3 bg-white'
                    style={{
                        border: '1px solid #EAEAEA',
                        boxShadow: '0px 2px 32px 2px #0000000A',
                        borderRadius: '10px'
                    }}
                >
                    <div className='d-flex justify-content-between align-items-center'>
                        <h6>My Subscription Plan</h6>
                        <div className='font-normal p-2 rounded-sm'
                            style={{
                                backgroundColor: '#F3F4F6',
                                color: '#101828',
                                fontSize: '15px'
                            }}
                        >Plan Expiring On : 3 Dec 2023</div>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='font-normal text-20'>Active Plan : <span className='text-color-secondary font-bold'>₹ 99 /Month</span></div>
                        <div>
                            <button className='border-0 bg-color-primary text-white text-14 font-semibold py-2 px-4 rounded-md'>Renew Plan <span><CrownIcon /></span> </button>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className='mt-5 text-center text-24 font-bold text-color-primary'>Upgrade & continue with Business plan</h3>

            <h5 className='my-4 text-center text-24 font-medium text-color-secondary'>Why Upgrade?</h5>

            <div className='text-center'>
                <h6 className='text-16 font-medium'>Unlock All Features:</h6>
                <p className='text-12 font-normal w-35 mx-auto' style={{ color: '#475467' }}>Gain access to a comprehensive set of features designed to maximize your learning potential.</p>
            </div>
            <div className='text-center mt-4'>
                <h6 className='text-16 font-medium'>Timeline will extend:</h6>
                <p className='text-12 font-normal w-35 mx-auto' style={{ color: '#475467' }}>
                    Enjoy tailored recommendations and insights based on your performance and preferences.
                </p>
            </div>

            <div className='membership-card-container'>
                <MembershipCard price='£79' dayAccess='30' />
                <MembershipCard price='£189' dayAccess='60' />
                <MembershipCard price='£439' dayAccess='360' />
            </div>
        </ModuleLayout>
    )
}

export default Membership