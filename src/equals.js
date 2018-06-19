export function argsEquals(prev, next) {
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

export function shallowEquals(prev, next) {
	if (prev === next) return true;
	const tprev = typeof prev;
	const tnext = typeof next;

	if (tprev !== tnext) return false;
	if (tprev !== 'object') return false;
	if (Array.isArray(prev) !== Array.isArray(next)) return false;

	const kprev = Object.keys(prev);
	const knext = Object.keys(next);

	if (kprev.length !== knext.length) return false;

	let len = kprev.length;
	while (len--) {
		if (prev[kprev[len]] !== next[knext[len]]) {
			return false;
		}
	}
	return true;
}
