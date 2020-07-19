import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {fetchOpponents} from "../../utils/Requests";
import {getToken, getUser} from "../../utils/AuthRequests";

// Suggest opponents that user has previously played but allow arbitrary values
export default function OpponentSearch(props) {
    const [pastOpponents, setPastOpponents] = useState([])
    const {setOpponent} = props;

    useEffect( () => {
        fetchOpponents(getToken(), getUser()).then((response) => {
            // Set the topics state with the response data
            setPastOpponents(response);
        })

    }, []);

    return (
        <div>
            <Autocomplete
                id="opponent-search"
                freeSolo
                options={pastOpponents.map(option => option.email)}
                onSelect={e => {console.log(e.target.value); setOpponent(e.target.value)}}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for your opponent..."
                        margin="normal"
                        variant="outlined"
                    />
                )}
            />
        </div>
    );
}
