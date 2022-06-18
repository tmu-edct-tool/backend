const expect = require("chai").expect;
import { convertArinc424ShorthandToCoordinate } from "../../internal/flight_plan_utils";

/**
 * Test cases from ARINC 424-20 7.2.5
 * @type {(string|number[])[][]}
 */
const paramAssertPairs = [
  // Whole degree latitude
  // North/West, longitude < 100
  ["5275N", [-75, 52]],
  ["5040N", [-40, 50]],
  ["0708N", [-8, 7]],
  // North/West, longitude >= 100
  ["75N70", [-170, 75]],
  ["07N20", [-120, 7]],
  // North/East, longitude < 100
  ["5020E", [20, 50]],
  ["7550E", [50, 75]],
  ["0608E", [8, 6]],
  // North/East, longitude >= 100
  ["75E50", [150, 75]],
  ["06E10", [110, 6]],
  // South/West, longitude < 100
  ["5275W", [-75, -52]],
  ["5040W", [-40, -50]],
  ["0708W", [-8, -7]],
  // South/West, longitude >= 100
  ["75W70", [-170, -75]],
  ["07W20", [-120, -7]],
  // South/East, longitude < 100
  ["5020S", [20, -50]],
  ["7550S", [50, -75]],
  ["0608S", [8, -6]],
  // South/East, longitude >= 100
  ["75S50", [150, -75]],
  ["06S10", [110, -6]],
  // Half degree latitude
  // North/West, longitude < 100
  ["N5620", [-20, 56.5]],
  ["N5040", [-40, 50.5]],
  ["N0708", [-8, 7.5]],
  // North/West, longitude >= 100
  ["7N570", [-170, 75.5]],
  ["0N720", [-120, 7.5]],
  // North/East, longitude < 100
  ["E5020", [20, 50.5]],
  ["E7550", [50, 75.5]],
  ["E0608", [8, 6.5]],
  // North/East, longitude >= 100
  ["7E550", [150, 75.5]],
  ["0E610", [110, 6.5]],
  // South/West, longitude < 100
  ["W5275", [-75, -52.5]],
  ["W5040", [-40, -50.5]],
  ["W0708", [-8, -7.5]],
  // South/West, longitude >= 100
  ["7W570", [-170, -75.5]],
  ["0W720", [-120, -7.5]],
  // South/East longitude < 100
  ["S5020", [20, -50.5]],
  ["S7550", [50, -75.5]],
  ["S0608", [8, -6.5]],
  // South/East longitude >= 100
  ["7S550", [150, -75.5]],
  ["0S610", [110, -6.5]],
];

describe("FlightPlanUtils", () => {
  describe("#convertArinc424ShorthandToCoordinate", () => {
    for (let [param, expected] of paramAssertPairs) {
      it(`${param} should be converted to ${expected}`, () => {
        expect(convertArinc424ShorthandToCoordinate(<string>param)).to.eql(
          <number[]>expected
        );
      });
    }
  });
});
