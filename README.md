# legendary-octo-rotary-phone
<b>TMU EDCT Tool</b>

The goal of this project is to develop a EDCT-based tool for Vatsim where aircraft can automatically be assigned an EDCT time in order to be released into an already set overhead stream.

This tool will perform 4 primary functions:
    1) Calculate ETA to metering fixes for aircraft already in the air within 300nm of the meter fix
    2) Find "gaps" over the meter fix large enough to fit departures out of the affected airports
    3) Have a saved database that stores "transit times" which is the time it takes an aircraft to get a takeoff clearance and then arrive at the meter fix
    4) Selected EDCT times and overhead aircraft ETAs to the meter fix will be saved as "slots" so other departures cannot take that slot and aircraft are not departure simultenously into the same slot

Partners: VATUSA, NYARTCC, BVARTCC, Virtual Cleveland ARTCC