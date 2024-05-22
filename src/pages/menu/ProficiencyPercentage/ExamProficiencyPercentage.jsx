import React from 'react'
import { Stack } from 'react-bootstrap'

import { SearchIcon } from './components/exam-proficiency-icons'
import ProficiencyProgressBar from './components/ProficiencyProgressBar'

const ExamProficiencyPercentage = () => {
    return (
        <div className='py-3'>
            <div className='px-5 py-2 bg-white d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-end gap-4'>
                    <h3 className='text-24 font-medium'>Exam Name 1</h3>
                    <Stack>
                        <span className='text-10 font-medium'>Overall Exam percentage</span>
                        <div style={{ width: '304px' }}>
                            <ProficiencyProgressBar current={55} height='2rem' />
                        </div>
                    </Stack>
                </div>
                <div className='d-flex gap-3'>
                    <div
                        className='rounded-xl px-3 py-2 d-flex align-items-center gap-2 bg-white'
                        style={{
                            border: '0.5px solid #8F8F8F',
                            boxShadow: '0px 4px 12px 0px #EEF4FF'
                        }}
                    >
                        <SearchIcon />
                        <input type="text" className='border-0' placeholder='Search topic' style={{ outline: 'none' }} />
                    </div>
                    <button
                        className='border-0 px-3 py-2 text-white bg-color-primary rounded'
                        style={{
                            boxShadow: '0px 4px 4px 0px #0000000A'
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>

            <Stack gap={4} className='px-5 py-5'>
                <div className='d-flex gap-3'>
                    <div className='flex-1 bg-white rounded-xl p-3'
                        style={{
                            border: '0.82px solid #F3F3F3'
                        }}
                    >
                        <div className='d-flex justify-content-between align-items-center gap-3'>
                            <p className='my-0 text-16 font-normal' style={{ minWidth: 'max-content' }}>Topic Name: <span className='font-medium text-color-primary'>Control Engineering</span></p>
                            <ProficiencyProgressBar labelColor='black' current={30} />
                        </div>
                        <hr />
                        <p className='text-14 font-semibold'>Subtopics Proficiency:</p>
                        <hr />
                        <Stack gap={2}>
                            {[12, 4, 8, 4, 2].map((percentage, idx) =>
                                <div key={idx} className='d-flex justify-content-between align-items-center'>
                                    <div className='py-2 px-3 w-75'
                                        style={{
                                            borderLeft: '0.82px solid #3538CD',
                                            background: '#F9FAFB'
                                        }}
                                    >Subtopic 1</div>
                                    <div className='text-14 font-bold text-color-primary'>{percentage}%</div>
                                </div>
                            )}
                        </Stack>
                    </div>

                    <div className='flex-1 bg-white rounded-xl p-3'
                        style={{
                            border: '0.82px solid #F3F3F3'
                        }}
                    >
                        <div className='d-flex justify-content-between align-items-center gap-3'>
                            <p className='my-0 text-16 font-normal' style={{ minWidth: 'max-content' }}>Topic Name: <span className='font-medium text-color-primary'>Robotics Engineering</span></p>
                            <ProficiencyProgressBar labelColor='black' current={55} />
                        </div>
                        <hr />
                        <p className='text-14 font-semibold'>Subtopics Proficiency:</p>
                        <hr />
                        <Stack gap={2}>
                            {[12, 4, 8, 4, 2].map((percentage, idx) =>
                                <div key={idx} className='d-flex justify-content-between align-items-center'>
                                    <div className='py-2 px-3 w-75'
                                        style={{
                                            borderLeft: '0.82px solid #3538CD',
                                            background: '#F9FAFB'
                                        }}
                                    >Subtopic 1</div>
                                    <div className='text-14 font-bold text-color-primary'>{percentage}%</div>
                                </div>
                            )}
                        </Stack>
                    </div>
                </div>

                <div className='d-flex gap-3'>
                    <div className='flex-1 bg-white rounded-xl p-3'
                        style={{
                            border: '0.82px solid #F3F3F3'
                        }}
                    >
                        <div className='d-flex justify-content-between align-items-center gap-3'>
                            <p className='my-0 text-16 font-normal' style={{ minWidth: 'max-content' }}>Topic Name: <span className='font-medium text-color-primary'>Control Engineering</span></p>
                            <ProficiencyProgressBar labelColor='black' current={65} />
                        </div>
                        <hr />
                        <p className='text-14 font-semibold'>Subtopics Proficiency:</p>
                        <hr />
                        <Stack gap={2}>
                            {[12, 4, 8, 4, 2].map((percentage, idx) =>
                                <div key={idx} className='d-flex justify-content-between align-items-center'>
                                    <div className='py-2 px-3 w-75'
                                        style={{
                                            borderLeft: '0.82px solid #3538CD',
                                            background: '#F9FAFB'
                                        }}
                                    >Subtopic 1</div>
                                    <div className='text-14 font-bold text-color-primary'>{percentage}%</div>
                                </div>
                            )}
                        </Stack>
                    </div>

                    <div className='flex-1 bg-white rounded-xl p-3'
                        style={{
                            border: '0.82px solid #F3F3F3'
                        }}
                    >
                        <div className='d-flex justify-content-between align-items-center gap-3'>
                            <p className='my-0 text-16 font-normal' style={{ minWidth: 'max-content' }}>Topic Name: <span className='font-medium text-color-primary'>Robotics Engineering</span></p>
                            <ProficiencyProgressBar labelColor='black' current={85} />
                        </div>
                        <hr />
                        <p className='text-14 font-semibold'>Subtopics Proficiency:</p>
                        <hr />
                        <Stack gap={2}>
                            {[12, 4, 8, 4, 2].map((percentage, idx) =>
                                <div key={idx} className='d-flex justify-content-between align-items-center'>
                                    <div className='py-2 px-3 w-75'
                                        style={{
                                            borderLeft: '0.82px solid #3538CD',
                                            background: '#F9FAFB'
                                        }}
                                    >Subtopic 1</div>
                                    <div className='text-14 font-bold text-color-primary'>{percentage}%</div>
                                </div>
                            )}
                        </Stack>
                    </div>
                </div>
            </Stack>
        </div>
    )
}

export default ExamProficiencyPercentage