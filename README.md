# legendary-octo-rotary-phone
<b>TMU EDCT Tool</b>
<p>
The goal of this project is to develop a EDCT-based tool for Vatsim where aircraft can automatically be assigned an EDCT time in order to be released into an already set overhead stream.
</p>
<p>
This tool will perform 4 primary functions:
    <ol>
    <li>Calculate ETA to metering fixes for aircraft already in the air within 300nm of the meter fix</li>
    <li>Find "gaps" over the meter fix large enough to fit departures out of the affected airports</li>
    <li>Have a saved database that stores "transit times" which is the time it takes an aircraft to get a takeoff clearance and then arrive at the meter fix</li>
    <li>Selected EDCT times and overhead aircraft ETAs to the meter fix will be saved as "slots" so other departures cannot take that slot and aircraft are not departure simultenously into the same slot</li>
    </ol>
</p>

Partners: VATUSA, NYARTCC, BVARTCC, Virtual Cleveland ARTCC