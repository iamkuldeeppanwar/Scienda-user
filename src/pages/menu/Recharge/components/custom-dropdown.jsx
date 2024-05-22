import React from 'react'

const CustomDropdown = (props) => {
    return (
        <select
            disabled={props.disabled || false}
            className='w-100 bg-white'
            style={{
                paddingLeft: props.pl || props.px,
                paddingRight: props.pr || props.px || "0.5rem",
                paddingTop: props.py || props.pt,
                paddingBottom: props.py || props.pb,
                borderWidth: props.bw || "2px",
                borderColor: props.bc || "#00008B",
                borderRadius: props.br || "0.5rem",
                color: props.tc || "#00008B",
                fontWeight: 500,
                fontSize: "1rem",
                margin: 0,
                boxShadow: props.shadow,
                outline: 'none',
                appearance: 'none',
                backgroundImage: 'url(/svg/arrow-down-outlined.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.7rem top 50%',
                backgroundSize: '0.65rem auto',
            }}
        >
            {props.options.map((opt, idx) =>
                <option 
                    className='px-2 py-2' 
                    style={{ 
                        paddingLeft: 10, 
                        backgroundColor: 'white' 
                    }} 
                    key={idx} 
                    value={opt.value}
                >
                    {opt.title}
                </option>)
            }
        </select>
    )
}

export default CustomDropdown;