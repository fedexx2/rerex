export function selector(input, compute, key) {
	if (!compute && !key) return () => input;

	const f = memoizeCached(compute, key);

	const makeSelector = function (/*selector args */) {
		const args = arguments;
		return function execute(state, props) {
			const inArgs = input.apply(this, [state, props, ...args]);
			return f(...inArgs);
		};
	};

	makeSelector.getInfo = () => f.getInfo();
	makeSelector.clearCache = () => f.clearCache();
	makeSelector.getCache = () => f.getCache();
	return makeSelector;
}

export default function rerex(map) {
	return function rerexrunner(state, props) {
		const ret = (typeof map === 'function') ? map(state, props) : map;
		for (const key in ret) {
			if (typeof ret[key] === 'function') {
				ret[key] = ret[key](state, props);
			}
		}
		return ret;
	};
}
