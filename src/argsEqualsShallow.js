export default function argsEqualsShallow(prev, next) {
	if (prev === null || next === null || prev.length !== next.length) {
		return false;
	}
	let len = prev.length;
	while (len--) {
		if (prev[len] !== next[len]) {
			return false;
		}
	}
	return true;
}
