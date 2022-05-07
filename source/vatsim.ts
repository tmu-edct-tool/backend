import axios, { AxiosResponse } from "axios";

interface StatusData {
    v3: [string];
    transceivers: [string];
    servers: [string];
    servers_sweatbox: [string];
    servers_all: [string];
}

interface VatsimStatus {
    data: StatusData;
    user: [string];
    metar: [string];
}

const getStatus = async (): Promise<VatsimStatus> => {
    let response: AxiosResponse = await axios.get("https://status.vatsim.net/status.json");
    return response.data;
}

export { getStatus };