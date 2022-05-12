import * as turf from "@turf/turf";
import { LineString } from "@turf/turf";

function extractRouteSegments(routeString: String): RouteSegment[] {
    let elements = getRouteElements(routeString);
    let result: RouteSegment[] = [];

    for (let i = 0; i < elements.length;) {
        const curr = elements[i];
        if (isWaypoint(curr)) {
            /*
             try addAirwaySegments(curr, nextAirway, nextWaypoint)
             try addDirect(curr, nextWaypoint)
             try addStar(currTransition, nextStar)
             */
        }
        if (isRhoThetaIntersection(curr)) {
            /*
             try addDirect(curr, nextWaypoint)
             try addDirectNearestAirwaySegment(curr, nextAirway, nextWaypointOnAirway)
             */
        }
        if (isVorRadial(curr)) {
            /*
             try addDirect(curr.VOR, nextWaypoint)
             try projectRadialToAirway(curr, nextAirway)
             */
        }
        if (isSidStar(curr)) {
            /*
             try prependSid and terminate to first element past SID
             try connecting last element before STAR to STAR and appendStar
             */
        }

        // i += count consumed elements
    }

    return result;
}

function getRouteElements(rawRoute: String): string[] {
    rawRoute = rawRoute.trim().toLocaleUpperCase();
    let tidyRoute = rawRoute
        .replace(/(^[^\w_]*)|([^\w_]*$)/g, "") // remove leading and trailing non-alphanumeric
        .replace(/(\w+)\/(\w+)/g, "$1") // remove step climb (e.g. JFK/N0450F390) and runway (e.g. KEWR/22L)
    // TODO: verify if dot-connected transitions (e.g. PORTT4.LANNA) should be preserved

    return tidyRoute.split(" ").filter((e) => e != "DCT"); // remove DCT
}

function isWaypoint(element: String): boolean {
    return false;
}

function isRhoThetaIntersection(element: String): boolean {
    return false;
}

function isVorRadial(element: String): boolean {
    return false;
}

function isAirway(element: String): boolean {
    return false;
}

function isSidStar(element: String): boolean {
    return false;
}

/**
 * Helper to find the coordinates of a Rho-Theta VOR fix (e.g. TEB335007)
 * @param vor
 * @param radial
 * @param dme
 */
export function findRadialDmeIntersection(
    vor: {lonX: number; latY: number; magVariation?: number},
    radial: number,
    dme: number
): number[] | undefined {
    const distanceTolerance = 10.0, kmDistance = dme * 1.852;
    const bearing = normalizeBearing(radial + (vor.magVariation || 0.0));  // convert radial to true
    const result = turf.destination([vor.lonX, vor.latY], kmDistance, bearing);
    if (turf.distance(result, [vor.lonX, vor.latY]) < distanceTolerance)
        return normalizeCoordinates(result.geometry.coordinates);
    return undefined;
    // this function applies to most cases
    // will return undefined for corner cases such as 'VOR' is right at N/S pole
    /*
     const bearing = normalizeBearing(radial) // facilities are oriented to true North at higher lats
     let result = turf.destination([bearing, vor.latY], kmDistance, 0)  // always use 0 for third param, regardless of N/S
     */
}

/**
 *  TODO: implement
 *  Find the first intersection of a VOR radial and an airway (e.g. TEB TEB270 V3)
 * @param vor
 * @param radial
 * @param airwayLineString
 */
export function findRadialAirwayIntersection(
    vor: {lonX: number; latY: number; magVariation?: number},
    radial: number,
    airwayLineString: LineString
    ) {
    // make vorRadialLine: LineString from vor and radial
    // const intersections = turf.lineIntersect(vorRadialLine, airwayLineString)
    // return the first (closest) intersection to vor
}

/**
 * TODO: implement
 * Find the first intersection of two VOR radials (e.g. TEB TEB090 BDR248 BDR)
 * @param vor1
 * @param vor2
 * @param radial1
 * @param radial2
 */
export function findRadialRadialIntersection(
    vor1: {lonX: number; latY: number; magVariation?: number},
    vor2: {lonX: number; latY: number; magVariation?: number},
    radial1: number,
    radial2: number
) {

}

/**
 * Normalize any bearing to `[-180, 180.0)` range
 * @param bearing to be normalized
 */
function normalizeBearing(bearing: number) {
    return normalizeToRange(bearing, -180, 180);
}

/**
 * Normalize any coordinate pair to GPS coordinate
 * @param coordinates pair to be normalized
 */
function normalizeCoordinates(coordinates: number[]) {
    return [
        normalizeToRange(coordinates[0], -90, 90),
        normalizeToRange(coordinates[1], -180, 180)
    ]
}

/**
 * Normalize any number to `[start, end)` range.
 * @param value to be normalized
 * @param start minimum value of the range, inclusive
 * @param end maximum value of the range, exclusive
 */
function normalizeToRange(value: number, start: number, end: number) {
    const width = end - start, offset = value - start;
    return offset - Math.floor(offset / width) * width + start;
}

function convertToDmsCoordinates(point: number[]) {
    return [
        convertDecimalToDms(point[0] || 0),
        convertDecimalToDms(point[1] || 0)
    ];
}

function convertDecimalToDms(dd: number): number[] {
    const flag = dd > 0;
    dd = Math.abs(dd);
    let d = Math.floor(dd);
    let m = Math.floor((dd - d) * 60);
    let s = Math.round(
        (((dd - d) * 60 - m) * 60 * Math.pow(10, 2)) / Math.pow(10, 2)
    );
    s == 60 && (m++, (s = 0));
    m == 60 && (d++, (m = 0));
    return [
        flag ? d : -d, m, s
    ];
}
