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