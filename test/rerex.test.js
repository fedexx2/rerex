import rerex, { selector } from './../src';

describe('TEST Rerex', () => {
	const selXX = selector(
		state => [state.x],
		x => x * x,
	);

	const selXWY = selector(
		(state, props) => [state.x, state.nested.w, props.y],
		(x, w, y) => x * w * y,
		(x, w) => w,
	);

	const state1 = { x: 5, nested: { w: 3 } };
	const props1 = { y: 2 };

	const state2 = { x: 10, nested: { w: 20 } };
	const props2 = { y: 30 };

	test('Only Selectors Map', () => {
		const s2p = rerex({
			xx: selXX,
			xwy: selXWY,
		});

		expect(typeof s2p).toBe('function');

		const map = s2p(state1, props1);

		expect(map).toEqual({ xx: 25, xwy: 30 });
		expect(selXX.getInfo()).toEqual({ calc: 1, hits: 0 });
		expect(selXWY.getInfo()).toEqual({ 3: { calc: 1, hits: 0 } });
	});


	test('Only Selectors Map 2', () => {
		const s2p = rerex({
			xx: selXX,
			xwy: selXWY,
		});

		expect(typeof s2p).toBe('function');

		const map = s2p(state2, props2);

		expect(map).toEqual({ xx: 100, xwy: 6000 });
		expect(selXX.getInfo()).toEqual({ calc: 2, hits: 0 });
		expect(selXWY.getInfo()).toEqual({ 3: { calc: 1, hits: 0 }, 20: { calc: 1, hits: 0 } });
	});


	test('Only Direct Map', () => {
		const s2p = rerex((state, props) => ({
			x: state.x,
			w: state.nested.w,
			y: props.y,
		}));
		expect(typeof s2p).toBe('function');

		const map = s2p(state1, props1);

		expect(map).toEqual({ x: 5, w: 3, y: 2 });
		expect(selXX.getInfo()).toEqual({ calc: 2, hits: 0 });
		expect(selXWY.getInfo()).toEqual({ 3: { calc: 1, hits: 0 }, 20: { calc: 1, hits: 0 } });
	});


	test('Only Direct Map 2', () => {
		const s2p = rerex((state, props) => ({
			x: state.x,
			w: state.nested.w,
			y: props.y,
		}));
		expect(typeof s2p).toBe('function');

		const map = s2p(state2, props2);

		expect(map).toEqual({ x: 10, w: 20, y: 30 });
		expect(selXX.getInfo()).toEqual({ calc: 2, hits: 0 });
		expect(selXWY.getInfo()).toEqual({ 3: { calc: 1, hits: 0 }, 20: { calc: 1, hits: 0 } });
	});

	test('Direct + Selector Map', () => {
		const s2p = rerex((state, props) => ({
			x: state.x,
			y: props.y,
			xx: selXX,
			xwy: selXWY,
		}));

		expect(typeof s2p).toEqual('function');

		// run1
		const map1 = s2p(state1, props1);

		expect(map1).toEqual({ x: 5, y: 2, xx: 25, xwy: 30 });
		expect(selXX.getInfo()).toEqual({ calc: 3, hits: 0 });
		expect(selXWY.getInfo()).toEqual({ 3: { calc: 1, hits: 1 }, 20: { calc: 1, hits: 0 } });

		// run1 bis
		const map1b = s2p(state1, props1);
		expect(map1b).toEqual({ x: 5, y: 2, xx: 25, xwy: 30 });
		expect(selXX.getInfo()).toEqual({ calc: 3, hits: 1 });
		expect(selXWY.getInfo()).toEqual({ 3: { calc: 1, hits: 2 }, 20: { calc: 1, hits: 0 } });

		// run2
		const map2 = s2p(state2, props2);
		expect(map2).toEqual({ x: 10, y: 30, xx: 100, xwy: 6000 });
		expect(selXX.getInfo()).toEqual({ calc: 4, hits: 1 });
		expect(selXWY.getInfo()).toEqual({ 3: { calc: 1, hits: 2 }, 20: { calc: 1, hits: 1 } });

		// run12
		const map12 = s2p(state1, props2);
		expect(map12).toEqual({ x: 5, y: 30, xx: 25, xwy: 450 });
		expect(selXX.getInfo()).toEqual({ calc: 5, hits: 1 });
		expect(selXWY.getInfo()).toEqual({ 3: { calc: 2, hits: 2 }, 20: { calc: 1, hits: 1 } });
	});
});

