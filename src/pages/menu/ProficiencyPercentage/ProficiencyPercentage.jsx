import React from 'react'

import { StopwatchIcon, CalendarIcon, QuestionsIcon, ScoreIcon } from './components/proficiency-percentage-icons';
import ModuleLayout from '../../../layout/ModuleLayout'
import { PERCENTAGES } from './constants/ProficiencyPercentage';

import ProficiencyProgressBar from './components/ProficiencyProgressBar';
import { useNavigate } from 'react-router-dom';

const ProficiencyPercentageCard = ({ examNumber, percentage, examId }) => {
    const navigate = useNavigate();

    return (
        <div className='bg-white w-100 p-3 rounded-lg'
            style={{
                border: '1px solid #8F8F8F17',
                boxShadow: '0px 12px 12px 0px #00000005'
            }}
        >
            <h5 className='text-14 font-medium text-center my-2 mb-3'>Exam Name {examNumber}</h5>
            <ProficiencyProgressBar current={percentage} />
            <div className='d-flex flex-column gap-2 my-2'>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='m-0 text-10 font-semibold'><StopwatchIcon /> Time Allotted:</p>
                    <p className='m-0 text-10 font-normal'>1 hr 20 min</p>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='m-0 text-10 font-semibold'><CalendarIcon /> Completed On::</p>
                    <p className='m-0 text-10 font-normal'>22Jan 2024,2:00 PM</p>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='m-0 text-10 font-semibold'><QuestionsIcon /> No. of Questions:</p>
                    <p className='m-0 text-10 font-normal'>1 hr 20 min</p>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='m-0 text-10 font-semibold'><ScoreIcon /> Your Score:</p>
                    <p className='m-0 text-10 font-normal'>55/100</p>
                </div>
            </div>
            <hr />
            <div className='text-center'>
                <button className='text-12 font-semibold text-color-primary bg-white rounded'
                    style={{
                        width: '9.75rem',
                        height: '2rem',
                        border: '1px solid #00008B',
                        boxShadow: '0px 4px 4px 0px #ACD4FF0A'
                    }}
                    onClick={() => navigate(`${examId}`)}
                >View Proficiency</button>
            </div>
        </div>
    )
}

const ProficiencyPercentage = () => {

    return (
        <ModuleLayout>
            <div className='d-flex flex-wrap gap-4 my-3'>
                {PERCENTAGES.map((obj, idx) => <div key={idx} style={{ width: '23%'}}>
                    <ProficiencyPercentageCard examId={idx} examNumber={obj.examNumber} percentage={obj.percentage} />
                </div>)}
            </div>
        </ModuleLayout>
    )
}

export default ProficiencyPercentage