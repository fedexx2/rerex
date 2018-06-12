import memo from './memo';


export default function selector(input, compute, key) {
	if (!compute && !key) return input;

	const memofunc = memo(compute, key);

	function selectorRunner(state, props) {
		let inArgs = input.call(this, state, props);
		inArgs = inArgs.map(i => (typeof i === 'function' ? i(state, props) : i));
		return memofunc(...inArgs);
	}
	selectorRunner.getInfo = () => memofunc.getInfo();
	selectorRunner.getCache = () => memofunc.getCache();
	selectorRunner.clear = () => memofunc.clear();
	return selectorRunner;
}
