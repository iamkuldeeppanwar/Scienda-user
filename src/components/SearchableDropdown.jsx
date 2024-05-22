import { useEffect, useRef, useState } from "react";
import '../styles/SearchableDropdown.css'
import { options } from "../constants/dropdownOptions";

export const SearchIconGrey = () => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 13L9 9M10.3333 5.66667C10.3333 6.2795 10.2126 6.88634 9.97811 7.45252C9.74358 8.01871 9.39984 8.53316 8.9665 8.9665C8.53316 9.39984 8.01871 9.74358 7.45252 9.97811C6.88634 10.2126 6.2795 10.3333 5.66667 10.3333C5.05383 10.3333 4.447 10.2126 3.88081 9.97811C3.31462 9.74358 2.80018 9.39984 2.36683 8.9665C1.93349 8.53316 1.58975 8.01871 1.35523 7.45252C1.12071 6.88634 1 6.2795 1 5.66667C1 4.42899 1.49167 3.242 2.36683 2.36683C3.242 1.49167 4.42899 1 5.66667 1C6.90434 1 8.09133 1.49167 8.9665 2.36683C9.84167 3.242 10.3333 4.42899 10.3333 5.66667Z" stroke="#A3A3A3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const ChevronDown = () => {
    return (<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.9352 10.1204L12.1352 14.9204L7.33518 10.1204" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    )
}

const ChevronUp = () => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33508 14.9206L12.1351 10.1206L16.9351 14.9206" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const SearchableDropdown = ({
    label,
    id,
    placeholder,
    disabled,
    fontSize,
    smallDropdown
}) => {
    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleChange = (val) => setValue(val);

    const inputRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", toggle);
        return () => document.removeEventListener("click", toggle);
    }, []);

    const selectOption = (option) => {
        setQuery(() => "");
        handleChange(option[label]);
        setIsOpen((isOpen) => !isOpen);
    };

    function toggle(e) {
        setIsOpen(e && e.target === inputRef.current);
    }

    const getDisplayValue = () => {
        if (query) return query;
        if (value) return value;

        return "";
    };

    const filter = (options) => {
        return options.filter(
            (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    const cls = `dropdown w-100 ${smallDropdown && 'small'}`

    return (
        <div className={cls}>
            <div className="control">
                <div className="selected-value">
                    <input 
                        disabled={disabled ? true : false}
                        placeholder={placeholder ? placeholder : "Select Option"}
                        ref={inputRef}
                        type="text"
                        value={getDisplayValue()}
                        name="searchTerm"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            handleChange(null);
                        }}
                        onClick={toggle}
                        style={{
                            fontSize: fontSize ? fontSize : '1rem',
                            margin: '0'
                        }}
                    />
                </div>
                <div className="search-icon"><SearchIconGrey /></div>
                <div className="arrow" onClick={() => setIsOpen(p => !p)}>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>

            <div className={`options ${isOpen ? "open" : ""}`}>
                {filter(options).map((option, index) => {
                    return (
                        <div
                            onClick={() => selectOption(option)}
                            className={`option ${option[label] === value ? "selected" : ""
                                }`}
                            key={`${id}-${index}`}
                        >
                            {option[label]}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchableDropdown;
