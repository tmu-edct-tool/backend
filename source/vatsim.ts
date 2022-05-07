import axios, { AxiosResponse } from "axios";

const getStatus = async (): Promise<VatsimStatus> => {
    let response: AxiosResponse = await axios.get("https://status.vatsim.net/status.json");
    return response.data;
}

const pullFeed = async(): Promise<DataFeed> => {
    // Get datafeed URL from VATSIM status (https://github.com/vatsimnetwork/developer-info/wiki/Data-Feeds)
    let status: VatsimStatus = await getStatus();
    let response: AxiosResponse = await axios.get(status.data.v3[0]);

    return response.data;
}

export { getStatus, pullFeed };