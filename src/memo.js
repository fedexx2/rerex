import { argsEquals } from './equals';

function memo1(func) {
	let lastArgs = null;
	let lastResult = null;
	let calc = 0;
	let hits = 0;

	function memo1Runner(/* f args */) {
		if (argsEquals(lastArgs, arguments)) {
			hits++;
			return lastResult;
		}
		calc++;
		lastArgs = arguments;
		lastResult = func(...arguments);
		return lastResult;
	}
	memo1Runner.getInfo = () => ({ hits, calc });
	memo1Runner.getCache = () => lastResult;
	memo1Runner.clear = () => { calc = 0; hits = 0; lastArgs = null; lastResult = null; };
	return memo1Runner;
}


export default function memok(func, keyfunc) {
	if (typeof keyfunc !== 'function') {
		return memo1(func);
	}

	const cache = new Map();
	function memokRunner(/* f args */) {
		const key = keyfunc(...arguments);
		let hit = cache.get(key);
		if (hit !== undefined) {
			return hit(...arguments);
		}
		hit = memo1(func);
		cache.set(key, hit);
		return hit(...arguments);
	}

	memokRunner.getInfo = () => Array.from(cache).reduce((acc, [key, value]) => ({ ...acc, [key]: value.getInfo() }), {});
	memokRunner.getCache = () => Array.from(cache).reduce((acc, [key, value]) => ({ ...acc, [key]: value.getCache() }), {});
	memokRunner.clear = () => cache.clear();
	return memokRunner;
}
