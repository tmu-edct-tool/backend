interface Route {
    identifier: string
    route_segments: [RouteSegment]
}

interface RouteSegment {
    sequence_number: number
    waypoint: Waypoint
    distance_to: number
    distance_from: number
}

interface Waypoint {
    point: NavAid | NavFix | TransferOfControlPoint
}

enum NavAidType {
    VOR,
    NDB
}

interface NavAid {
    identifier: string
    type: NavAidType
}

enum NavFixType {
    INTERSECTION,
    FIX
}

interface NavFix {
    identifier: string
    nav_fix_type: NavFixType
}

interface TransferOfControlPoint {
    facility_1: string
    facility_2: string
}
