
export default function rerex(init) {
	return function rerexRunner(state, props) {
		const map = (typeof init === 'function') ? init(state, props) : init;
		const ret = {};
		for (const key in map) {
			ret[key] = (typeof map[key] === 'function')
				? map[key](state, props)
				: map[key];
		}
		return ret;
	};
}
