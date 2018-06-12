import rerex from './src/rerex';


const s2p1 = rerex({
	// map only selectors
});


const s2p2 = rerex((state, props) => {
	// map selectors + direct
});

const s2pO = (state, props) => ({
	// original map
});


const s2p3 = (state, props) => rerex({
	// map ?
});


const selXyz = selector(
	(state, props) => [
		state.x,
		props.y,
	],
	(x, y) => dowork(x, y),
	(x, y) => x,
);
