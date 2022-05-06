# Legendary-Octo-Rotary-Phone
**(Aka: TMU EDCT Tool)**

The goal of this project is to develop a EDCT-based tool for Vatsim where aircraft can automatically be assigned an EDCT time in order to be released into an already set overhead stream.

This tool will perform 4 primary functions:

1. Calculate ETA to metering fixes for aircraft already in the air within 300nm of the meter fix
2. Find "gaps" over the meter fix large enough to fit departures out of the affected airports
3. Have a saved database that stores "transit times" which is the time it takes an aircraft to get a takeoff clearance and then arrive at the meter fix
4. Selected EDCT times and overhead aircraft ETAs to the meter fix will be saved as "slots" so other departures cannot take that slot and aircraft are not departure simultenously into the same slot

Partners: VATUSA, NYARTCC, BVARTCC, Virtual Cleveland ARTCC

# Requirements
This project is built on NodeJS, Express, and TypeScript and requires the following:
- NodeJS version: v.14.x or higher (LTS)
- TypeScript version v.4.6.x or higher

# Installation
To install this project, clone the repo run the following command:

```
npm install
```

# Usage
To run the project, run the following command:

```
npm run dev
```

# Docker Setup
To run the project in docker, run the following command:

```
docker build -t edct-tool .
docker run -dp 3000:3000 edct-tool
```

If you want to make live reloading work, you will need to map a docker volume to the project directory.
This is already done in the docker-compose.yml file. (NOT IMPLEMENTED YET)
