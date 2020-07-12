import axios from "axios";

export const fetchMatchUps = async (jwt, user) => (await axios.get(`http://127.0.0.1:5000/matchups/${user}`, {
    headers: {
        Authorization:
            `Bearer ${jwt}`
    }
})).data;

export const postUserData = async (user) => (await axios.post('http://127.0.0.1:5000/signin', user)).data;