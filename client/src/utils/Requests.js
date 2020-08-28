import axios from "axios";
import {getToken} from "./AuthRequests";

export const fetchMatchUps = async () => (await axios.get(`http://127.0.0.1:5000/matchups`, {
    headers: {
        Authorization:
            `Bearer ${getToken()}`
    }
})).data;

export const fetchGames = async () => (await axios.get(`http://127.0.0.1:5000/games`, {
    headers: {
        Authorization:
            `Bearer ${getToken()}`
    }
})).data;

export const fetchOpponents = async () => (await axios.get(`http://127.0.0.1:5000/opponents`, {
    headers: {
        Authorization:
            `Bearer ${getToken()}`
    }
})).data;

export const postUserData = async (user) => (await axios.post('http://127.0.0.1:5000/signin', user)).data;

export const postGameData = async (game) => (await axios.post('http://127.0.0.1:5000/gameinput',
    game,
    {
        headers: {
            Authorization:
                `Bearer ${getToken()}`
        }
    })).data;

export const approveGames = async (games) => (await axios.post('http://127.0.0.1:5000/approvegame',
    games,
    {
        headers: {
            Authorization:
                `Bearer ${getToken()}`
        }
    })).data;