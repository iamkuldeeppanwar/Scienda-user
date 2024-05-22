
const ProficiencyProgressBar = ({ current, height, parentBackground, labelColor }) => {

    let bgColor = "";
    if (current <= 40) {
        bgColor = '#E97E00'
    }
    else if (current <= 55) {
        bgColor = '#FAC515'
    }
    else if (current <= 65) {
        bgColor = '#CDFF7C'
    }
    else if (current <= 75) {
        bgColor = '#39FF28'
    }
    else if (current <= 100) {
        bgColor = '#0EAC00'
    }

    return (
        <div
            className='rounded-pill'
            style={{
                height: height ? height : '18px',
                width: '100%',
                backgroundColor: parentBackground ? parentBackground : '#F5F5F5',
            }}
        >
            <div className='text-10 font-bold rounded-pill px-2 d-flex justify-content-end align-items-center'
                style={{
                    height: height ? height : '18px',
                    width: `${current}%`,
                    backgroundColor: bgColor,
                    color: labelColor ? labelColor : 'white'
                }}
            >
                {current}%
            </div>
        </div>
    )
}

export default ProficiencyProgressBar;