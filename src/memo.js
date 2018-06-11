import argsShallowEquals from './argsEqualsShallow';


function memo1(func, argsComparer = argsShallowEquals) {
	let lastArgs = null;
	let lastResult = null;
	let calc = 0;
	let hits = 0;

	function memo1Runner(/* f args */) {
		if (argsComparer(lastArgs, arguments)) {
			hits++;
			return lastResult;
		}
		calc++;
		lastArgs = arguments;
		lastResult = func(...arguments);
		return lastResult;
	}
	memo1Runner.getInfo = () => ({ hits, calc });
	memo1Runner.clearCache = () => { lastArgs = null; lastResult = null; };
	memo1Runner.getCache = () => lastResult;
	return memo1Runner;
}


export default function memoK(func, keyfunc, argsComparer = argsShallowEquals) {
	if (typeof keyfunc !== 'function') {
		return memo1(func, argsComparer);
	}

	const cache = new Map();
	function memoKrunner(/* f args */) {
		const key = keyfunc(...arguments);
		let hit = cache.get(key);
		if (hit !== undefined) {
			return hit(...arguments);
		}
		hit = memo1(func, argsComparer);
		cache.set(key, hit);
		return hit(...arguments);
	}

	memoKrunner.getInfo = () => Array.from(cache).map(([key, value]) => ({ [key]: value.getInfo() }));
	memoKrunner.clearCache = () => cache.clear();
	memoKrunner.getCache = () => cache;
	return memoKrunner;
}
