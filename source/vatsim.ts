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

interface General {
    version: number;
    reload: number;
    update: string;
    update_timestamp: string;
    connected_clients: number;
    unique_users: number;
}

interface FlightPlan {
    flight_rules: "I" | "V";
    aircraft: string;
    aircraft_faa: string;
    aircraft_short: string;
    departure: string;
    arrival: string;
    alternate: string;
    cruise_tas: string;
    altitude: string;
    remarks: string;
    route: string;
    assigned_transponder: string;
}

interface Pilot {
    cid: number;
    name: string;
    callsign: string;
    server: string;
    pilot_rating: number;
    latitude: number;
    longitude: number;
    altitude: number;
    groundspeed: number;
    transponder: string;
    heading: number;
    qnh_i_hg: number;
    qnh_mb: number;
    flight_plan: null | FlightPlan;
    logon_time: string;
    last_updated: string;
}

interface Controller {
    cid: number;
    name: string;
    callsign: string;
    frequency: string;
    facility: number;
    rating: number;
    server: string;
    visual_range: number;
    text_atis: [string];
    last_updated: string;
    logon_time: string;
}

interface Atis {
    cid: number;
    name: string;
    callsign: string;
    frequency: string;
    facility: number;
    rating: number;
    server: string;
    visual_range: number;
    atis_code: string;
    text_atis: [string];
    last_updated: string;
    logon_time: string;
}

interface Server {
    ident: string;
    hostname_or_ip: string;
    location: string;
    name: string;
    clients_connection_allowed: number;
    client_connections_allowed: Boolean;
    is_sweatbox: Boolean;
}

interface Prefile {
    cid: number;
    name: string;
    callsign: string;
    flight_plan: FlightPlan;
    last_updated: string;
}

interface Facility {
    id: number;
    short: string;
    long: string;
}

interface Rating {
    id: number;
    short: string;
    long: string;
}

interface PilotRating {
    id: number;
    short_name: string;
    long_name: string;
}

interface DataFeed {
    general: General;
    pilots: [Pilot];
    controllers: [Controller];
    atis: [Atis];
    servers: [Server];
    prefiles: [Prefile];
    facilities: [Facility];
    ratings: [Rating];
    pilot_ratings: [PilotRating];
}

const pullFeed = async(): Promise<DataFeed> => {
    // Get datafeed URL from VATSIM status (https://github.com/vatsimnetwork/developer-info/wiki/Data-Feeds)
    let status: VatsimStatus = await getStatus();
    let response: AxiosResponse = await axios.get(status.data.v3[0]);

    return response.data;
}

export { getStatus, pullFeed };