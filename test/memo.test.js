import memo from './../src/memo';

describe('TEST FUNC memo1', () => {
	const mock = jest.fn();
	function f(a, b, c) {
		mock(); return a + b + c;
	}
	const func = memo(f);

	test('Compute', () => {
		expect(func(1, 2, 3)).toBe(6);
		expect(mock.mock.calls.length).toBe(1);
		expect(func.getInfo()).toEqual({ hits: 0, calc: 1 });
	});


	test('Re-Compute - hits', () => {
		expect(func(1, 2, 3)).toBe(6);
		expect(mock.mock.calls.length).toBe(1);
		expect(func.getInfo()).toEqual({ hits: 1, calc: 1 });
	});


	test('Re-Compute - hits2', () => {
		expect(func(1, 2, 3)).toBe(6);
		expect(mock.mock.calls.length).toBe(1);
		expect(func.getInfo()).toEqual({ hits: 2, calc: 1 });
	});


	test('New Args', () => {
		expect(func(3, 4, 5)).toBe(12);
		expect(mock.mock.calls.length).toBe(2);
		expect(func.getInfo()).toEqual({ hits: 2, calc: 2 });
	});

	test('New Args Re-Compute - hits', () => {
		expect(func(3, 4, 5)).toBe(12);
		expect(mock.mock.calls.length).toBe(2);
		expect(func.getInfo()).toEqual({ hits: 3, calc: 2 });
	});

	test('NewArgs x2', () => {
		expect(func(1, 1, 1)).toBe(3);
		expect(func(2, 2, 2)).toBe(6);
		expect(mock.mock.calls.length).toBe(4);
		expect(func.getInfo()).toEqual({ hits: 3, calc: 4 });
	});
});

describe('TEST FUNC memok', () => {
	const mock = jest.fn();
	function f(a, b, c) {
		mock(); return a + b + c;
	}
	const func = memo(f, (a, b, c) => c);

	test('Compute 1 2 3k', () => {
		expect(func(1, 2, 3)).toBe(6);
		expect(mock.mock.calls.length).toBe(1);
		expect(func.getInfo()).toEqual({ 3: { hits: 0, calc: 1 } });
	});

	test('Recompute 1 2 3k - hits1', () => {
		expect(func(1, 2, 3)).toBe(6);
		expect(mock.mock.calls.length).toBe(1);
		expect(func.getInfo()).toEqual({ 3: { hits: 1, calc: 1 } });
	});

	test('Compute 6 6 6k', () => {
		expect(func(6, 6, 6)).toBe(18);
		expect(mock.mock.calls.length).toBe(2);
		expect(func.getInfo()).toEqual({ 3: { hits: 1, calc: 1 }, 6: { hits: 0, calc: 1 } });
	});

	test('Recompute 6 6 6k - hits1', () => {
		expect(func(6, 6, 6)).toBe(18);
		expect(mock.mock.calls.length).toBe(2);
		expect(func.getInfo()).toEqual({ 3: { hits: 1, calc: 1 }, 6: { hits: 1, calc: 1 } });
	});

	test('Recompute 1 2 3k - hits2', () => {
		expect(func(1, 2, 3)).toBe(6);
		expect(mock.mock.calls.length).toBe(2);
		expect(func.getInfo()).toEqual({ 3: { hits: 2, calc: 1 }, 6: { hits: 1, calc: 1 } });
	});

	test('Recompute 6 6 6k - hits2', () => {
		expect(func(6, 6, 6)).toBe(18);
		expect(mock.mock.calls.length).toBe(2);
		expect(func.getInfo()).toEqual({ 3: { hits: 2, calc: 1 }, 6: { hits: 2, calc: 1 } });
	});


	test('Compute 2 2 3k', () => {
		expect(func(2, 2, 3)).toBe(7);
		expect(mock.mock.calls.length).toBe(3);
		expect(func.getInfo()).toEqual({ 3: { hits: 2, calc: 2 }, 6: { hits: 2, calc: 1 } });
	});

	test('Recompute 6 6 6k - hits3', () => {
		expect(func(6, 6, 6)).toBe(18);
		expect(mock.mock.calls.length).toBe(3);
		expect(func.getInfo()).toEqual({ 3: { hits: 2, calc: 2 }, 6: { hits: 3, calc: 1 } });
	});


	test('Recompute 2 2 3k - hits3', () => {
		expect(func(2, 2, 3)).toBe(7);
		expect(mock.mock.calls.length).toBe(3);
		expect(func.getInfo()).toEqual({ 3: { hits: 3, calc: 2 }, 6: { hits: 3, calc: 1 } });
	});

	test('Compute 1 2 3k', () => {
		expect(func(1, 2, 3)).toBe(6);
		expect(mock.mock.calls.length).toBe(4);
		expect(func.getInfo()).toEqual({ 3: { hits: 3, calc: 3 }, 6: { hits: 3, calc: 1 } });
	});

	test('Compute 0 0 0', () => {
		expect(func(0, 0, 0)).toBe(0);
		expect(mock.mock.calls.length).toBe(5);
		expect(func.getInfo()).toEqual({ 3: { hits: 3, calc: 3 }, 6: { hits: 3, calc: 1 }, 0: { hits: 0, calc: 1 } });
	});

	test('Recompute 6 6 6k, hits4', () => {
		expect(func(6, 6, 6)).toBe(18);
		expect(mock.mock.calls.length).toBe(5);
		expect(func.getInfo()).toEqual({ 3: { hits: 3, calc: 3 }, 6: { hits: 4, calc: 1 }, 0: { hits: 0, calc: 1 } });
	});
});

