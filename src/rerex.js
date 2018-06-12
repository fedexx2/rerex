
export default function rerex(map) {
	return function rerexRunner(state, props) {
		const ret = (typeof map === 'function') ? map(state, props) : map;

		for (const key in ret) {
			if (typeof ret[key] === 'function') {
				ret[key] = ret[key](state, props);
			}
		}
		return ret;
	};
}
