import React from 'react'

import { CalendarArrowLeft, CalendarArrowRight } from './dashboard-icons'
import { Stack } from 'react-bootstrap'

const Calendar = () => {
    return (
        <div
            className='bg-white'
            style={{
                width: '11.45rem',
                // boxShadow: '0px 4.47px 4.47px -2.23px #10182808',
                boxShadow: '0px 11.17px 13.41px -2.23px #10182814',
                border: '0.42px solid #F2F4F7',
                borderRadius: '6.7px',
                padding: '11.17px 13.41px 11.17px 13.41px',
            }}
        >
            <div className='d-flex justify-content-between align-items-center'>
                <CalendarArrowLeft />
                <p
                    className='m-0 font-semibold text-10'
                >January 2022</p>
                <CalendarArrowRight />
            </div>
            <div className='my-2 d-flex justify-content-between align-items-center gap-2'>
                <div className='text-10 font-normal flex-grow-1'
                    style={{
                        boxShadow: '0px 0.56px 1.12px 0px #1018280D',
                        border: '0.56px solid #D0D5DD',
                        borderRadius: '5px',
                        padding: '4.47px 7.82px'
                    }}
                >Jan 6, 2022</div>
                <div className='text-10 font-normal'
                    style={{
                        boxShadow: '0px 0.56px 1.12px 0px #1018280D',
                        border: '0.56px solid #D0D5DD',
                        borderRadius: '5px',
                        padding: '4.47px 7.82px'
                    }}
                >Today</div>
            </div>
            <div>
                <div className='d-flex justify-content-between font-medium text-10'>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>Mo</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>Tu</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>We</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>Th</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>Fr</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>Sat</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>Su</span>
                </div>
                <div className='d-flex justify-content-between font-medium text-10'>
                    <div className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive position-relative'>
                        26
                        <div
                            className='position-absolute'
                            style={{
                                left: '50%',
                                translate: '-50%',  
                                width: '3px',
                                height: '3px',
                                backgroundColor: '#98A2B3',
                                borderRadius: '50%'
                            }}
                        ></div>
                    </div>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>27</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>28</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>29</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>30</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>31</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>1</span>
                </div>
                <div className='d-flex justify-content-between font-medium text-10'>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-success text-white'>2</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-success text-white'>3</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-success text-white'>4</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-success text-white'>5</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-success text-white'>6</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-danger text-white'>7</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-danger text-white'>8</span>
                </div>
                <div className='d-flex justify-content-between font-medium text-10'>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>9</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-success text-white'>10</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-danger text-white'>11</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-danger text-white'>12</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>13</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>14</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>15</span>
                </div>
                <div className='d-flex justify-content-between font-medium text-10'>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>16</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>17</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>18</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>19</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>20</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-danger text-white'>21</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-success text-white'>22</span>
                </div>
                <div className='d-flex justify-content-between font-medium text-10'>
                    <span className='flex-grow-1 text-center py-1 rounded-circle bg-color-success text-white'>23</span>
                    <div className='position-relative flex-grow-1 text-center py-1 rounded-circle'
                        style={{
                            backgroundColor: '#F2F4F7'
                        }}
                    >
                        24
                        <div
                            className='position-absolute'
                            style={{
                                left: '50%',
                                translate: '-50%',  
                                width: '3px',
                                height: '3px',
                                backgroundColor: '#7F56D9',
                                borderRadius: '50%'
                            }}
                        ></div>
                    </div>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>25</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>26</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>27</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>28</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>29</span>
                </div>
                <div className='d-flex justify-content-between font-medium text-10'>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>30</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle'>31</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>1</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>2</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>3</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>4</span>
                    <span className='flex-grow-1 text-center py-1 rounded-circle text-color-inactive'>5</span>
                </div>
            </div>
        </div>
    )
}

export default Calendar