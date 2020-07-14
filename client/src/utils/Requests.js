import axios from "axios";
import SERVER from "./Hosts"

export const fetchMatchUps = async (jwt) => (await axios.get(`${SERVER}/matchups`, {
    headers: {
        Authorization:
            `Bearer ${jwt}`
    }
})).data;

export const postUserData = async (user) => (await axios.post(`${SERVER}/signin`, user)).data;

export const postGameData = async (jwt, game) => (await axios.post(`${SERVER}/gameinput`,
    game,
    {
        headers: {
            Authorization:
                `Bearer ${jwt}`
        }
    })).data;