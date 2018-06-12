
export default function rerex(map) {
	return function rerexRunner(state, props) {
		const ret = (typeof map === 'function') ? map(state, props) : map;
		return Object.keys(ret).map(key => (
			(typeof ret[key] === 'function') ? ret[key](state, props) : ret[key]
		));
	};
}
