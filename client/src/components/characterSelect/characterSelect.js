import React from 'react';
import Select from 'react-select';
import {CHARACTERS, STOCK_LOGOS} from "../../constants";
import PropTypes from 'prop-types';

const selectStyles = {
    menu: base => ({
        ...base,
        zIndex: 100
    })
};

let characters = []
CHARACTERS.map((char) =>
        characters.push({
            value: char,
            label:
                <div style={{fontSize: "20px"}}>
                    <img src={STOCK_LOGOS[char]} height="25px" width="25px"/>
                    {char}
                </div>
        })
);

export default function CharacterSelect(props) {
    const { placeholder, setChar } = props;
    const options = characters;

    return (
            <Select
                placeholder={placeholder}
                className="basic-single"
                classNamePrefix="select"
                styles={selectStyles}
                defaultValue={""}
                isClearable={true}
                isSearchable={true}
                name="character"
                options={options}
                onChange={e => setChar(e.value)}
            />
    );
}

CharacterSelect.protoTypes = {
    placeholder: PropTypes.string
};
