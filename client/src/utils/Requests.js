import axios from "axios";

export const fetchMatchUps = async (jwt) => (await axios.get(`http://127.0.0.1:5000/matchups`, {
    headers: {
        Authorization:
            `Bearer ${jwt}`
    }
})).data;

export const postUserData = async (user) => (await axios.post('http://127.0.0.1:5000/signin', user)).data;

export const postGameData = async (jwt, game) => (await axios.post('http://127.0.0.1:5000/gameinput',
    game,
    {
        headers: {
            Authorization:
                `Bearer ${jwt}`
        }
    })).data;