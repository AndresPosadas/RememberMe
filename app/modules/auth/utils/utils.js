export function deepcopy(object) {
	return JSON.parse(JSON.stringify(object));
}