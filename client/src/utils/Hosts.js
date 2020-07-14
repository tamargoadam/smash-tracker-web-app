import development from './config/development.json'
import production from './config/production.json'

const getHosts = () => {
    const { hostname } = window.location;

    if (hostname.includes('localhost')) return development;
    return production
};

export const SERVER = getHosts().server;
