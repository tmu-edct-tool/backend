const ArincShorthandTypes = new Map<string, number[]>([
	["N", [1, -1]], // North/West
	["E", [1, 1]], // North/East
	["S", [-1, 1]], // South/East
	["W", [-1, -1]] // South/West
]);

export function convertArinc424ShorthandToCoordinate(
	arinc: string
): number[] | undefined {
	// https://www.tc.faa.gov/its/worldpac/Standards/arinc/arinc%20424-20.pdf
	// 7.2.5 Reporting Positions Defined by Coordinates
	const sanitizer =
		/^(?=([NESW]\d{4})|(\d[NESW]\d{3})|(\d{2}[NESW]\d{2})|(\d{4}[NESW]))[\dNESW]{5}$/;
	if (sanitizer.exec(arinc) == null) return undefined;

	const match = /[NESW]/.exec(arinc); // matches the first letter

	const lonLessThan100 = match!.index != 1 && match!.index != 2;
	const latIsHalfDegree = match!.index == 0 || match!.index == 1;
	const arincShorthandType = match![0];
	const digits = arinc.replace(match![0], "");

	let coordinates = [
		parseInt(digits.substring(0, 2)),
		parseInt(digits.substring(2))
	];
	coordinates[0] += latIsHalfDegree ? 0.5 : 0;
	coordinates[1] += lonLessThan100 ? 0 : 100;
	coordinates = coordinates.map((x, index) => {
		return x * ArincShorthandTypes.get(arincShorthandType)![index];
	});

	return coordinates.reverse(); // use lonX, latY order for consistency
}

function convertDmsWaypointToCoordinate(dmsWaypoint: String) {
}
