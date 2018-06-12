import { selector } from './../src';


describe('TEST Simple Selector', () => {
	const sel = selector(
		(state, props) => [state.x, props.y],
		(x, y) => x + y,
	);

	test('is function', () => {
		expect(typeof sel).toBe('function');
	});

	test('Simple computation', () => {
		const v = sel({ x: 1 }, { y: 2 });
		expect(v).toBe(3);
		expect(sel.getInfo()).toEqual({ hits: 0, calc: 1 });
	});

	test('Recomputation 1', () => {
		const v = sel({ x: 1 }, { y: 2 });
		expect(v).toBe(3);
		expect(sel.getInfo()).toEqual({ hits: 1, calc: 1 });
	});

	test('Recomputation 2', () => {
		const v = sel({ x: 1 }, { y: 2 });
		expect(v).toBe(3);
		expect(sel.getInfo()).toEqual({ hits: 2, calc: 1 });
	});

	test('Cached Value', () => {
		const c = sel.getCache();
		expect(c).toBe(3);
	});

	test('Change Params', () => {
		const v = sel({ x: 5 }, { y: 10 });
		expect(v).toBe(15);
		expect(sel.getInfo()).toEqual({ hits: 2, calc: 2 });
	});

	test('Cached Value 2', () => {
		const c = sel.getCache();
		expect(c).toBe(15);
	});

	test('Clear cache', () => {
		sel.clear();
		expect(sel.getCache()).toBe(null);
		expect(sel.getInfo()).toEqual({ hits: 0, calc: 0 });
	});

	test('Recomputation 3 cache cleared', () => {
		const v = sel({ x: 5 }, { y: 10 });
		expect(v).toBe(15);
		expect(sel.getInfo()).toEqual({ hits: 0, calc: 1 });
	});

	test('Recomputation 4', () => {
		const v = sel({ x: 5 }, { y: 10 });
		expect(v).toBe(15);
		expect(sel.getInfo()).toEqual({ hits: 1, calc: 1 });
	});
});


describe('TEST Cached Selector', () => {
	const sel = selector(
		(state, props) => [state.x, props.y],
		(x, y) => x + y,
		(x, y) => y,
	);

	test('is function', () => {
		expect(typeof sel).toBe('function');
	});

	test('Computation y=1', () => {
		const v = sel({ x: 5 }, { y: 1 });
		expect(v).toBe(6);

		expect(sel.getCache()).toEqual({ 1: 6 });
		expect(sel.getInfo()).toEqual({ 1: { hits: 0, calc: 1 } });
	});

	test('Recomputation y=1', () => {
		const v = sel({ x: 5 }, { y: 1 });
		expect(v).toBe(6);
		expect(sel.getCache()).toEqual({ 1: 6 });
		expect(sel.getInfo()).toEqual({ 1: { hits: 1, calc: 1 } });
	});

	test('Computation y=3', () => {
		const v = sel({ x: 7 }, { y: 3 });
		expect(v).toBe(10);
		expect(sel.getCache()).toEqual({ 1: 6, 3: 10 });
		expect(sel.getInfo()).toEqual({ 1: { hits: 1, calc: 1 }, 3: { hits: 0, calc: 1 } });
	});

	test('Recomputation y=3', () => {
		const v = sel({ x: 7 }, { y: 3 });
		expect(v).toBe(10);
		expect(sel.getCache()).toEqual({ 1: 6, 3: 10 });
		expect(sel.getInfo()).toEqual({ 1: { hits: 1, calc: 1 }, 3: { hits: 1, calc: 1 } });
	});

	test('Recomputation y=1', () => {
		const v = sel({ x: 5 }, { y: 1 });
		expect(v).toBe(6);
		expect(sel.getCache()).toEqual({ 1: 6, 3: 10 });
		expect(sel.getInfo()).toEqual({ 1: { hits: 2, calc: 1 }, 3: { hits: 1, calc: 1 } });
	});

	test('Change Args y=1', () => {
		const v = sel({ x: 1 }, { y: 1 });
		expect(v).toBe(2);
		expect(sel.getCache()).toEqual({ 1: 2, 3: 10 });
		expect(sel.getInfo()).toEqual({ 1: { hits: 2, calc: 2 }, 3: { hits: 1, calc: 1 } });
	});

	test('Recomputation y=3', () => {
		const v = sel({ x: 7 }, { y: 3 });
		expect(v).toBe(10);
		expect(sel.getCache()).toEqual({ 1: 2, 3: 10 });
		expect(sel.getInfo()).toEqual({ 1: { hits: 2, calc: 2 }, 3: { hits: 2, calc: 1 } });
	});

	test('Clear Info', () => {
		sel.clear();
		expect(sel.getInfo()).toEqual({});
		expect(sel.getCache()).toEqual({});
	});
});

describe('TEST Cached Selector NESTED', () => {
	const seln = selector(
		(state, props) => [state.nested.x, props.y],
		(x, y) => (x ** 2) + y,
		(x, y) => y,
	);

	test('is function', () => {
		expect(typeof seln).toBe('function');
	});

	test('Compute y=1', () => {
		const v = seln({ nested: { x: 5 } }, { y: 1 });
		expect(v).toBe(26);
		expect(seln.getInfo()).toEqual({ 1: { hits: 0, calc: 1 } });
		expect(seln.getCache()).toEqual({ 1: 26 });
	});

	test('Compute y=3', () => {
		const v = seln({ nested: { x: 6 } }, { y: 3 });
		expect(v).toBe(39);
		expect(seln.getInfo()).toEqual({ 1: { hits: 0, calc: 1 }, 3: { hits: 0, calc: 1 } });
		expect(seln.getCache()).toEqual({ 1: 26, 3: 39 });
	});

	test('Recompute y=1, different nested - hits', () => {
		const v = seln({ nested: { x: 5 } }, { y: 1 });
		expect(v).toBe(26);
		expect(seln.getInfo()).toEqual({ 1: { hits: 1, calc: 1 }, 3: { hits: 0, calc: 1 } });
		expect(seln.getCache()).toEqual({ 1: 26, 3: 39 });
	});
});

describe('TEST Trivial Selector', () => {
	const sel = selector(state => state.x);

	test('is function', () => {
		expect(typeof sel).toBe('function');
	});

	test('Select 1', () => {
		const v = sel({ x: 1 });
		expect(v).toBe(1);
	});

	test('Select 5', () => {
		const v = sel({ x: 5 });
		expect(v).toBe(5);
	});

	test('Simple Func', () => {
		expect(1).toBe(1);
	});
});
