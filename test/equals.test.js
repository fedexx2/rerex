import { argsEquals, shallowEquals } from './../src';


describe('TEST FUNC argsEquals', () => {
	test('null, null', () => {
		expect(argsEquals(null, null)).toBe(false);
	});

	test('null, []', () => {
		expect(argsEquals(null, [])).toBe(false);
	});

	test('[], null', () => {
		expect(argsEquals([], null)).toBe(false);
	});

	test('[], []', () => {
		expect(argsEquals([], [])).toBe(true);
	});

	test('[1], [1]', () => {
		expect(argsEquals([1], [1])).toBe(true);
	});

	test('[1], null', () => {
		expect(argsEquals([], null)).toBe(false);
	});

	test('[1], [2]', () => {
		expect(argsEquals([1], [2])).toBe(false);
	});

	test('[1,6], [1,6]', () => {
		expect(argsEquals([1, 6], [1, 6])).toBe(true);
	});

	test('[1,6], [6,1]', () => {
		expect(argsEquals([1, 6], [6, 1])).toBe(false);
	});

	test('[1,6,"foo"], [6,1,"foo"]', () => {
		expect(argsEquals([1, 6, 'foo'], [6, 1, 'foo'])).toBe(false);
	});

	test('[6,"foo",5], [6,"foo",5]', () => {
		expect(argsEquals([6, 'foo', 5], [6, 'foo', 5])).toBe(true);
	});

	test('[6,"foo",[]], [6,"foo",[]]', () => {
		expect(argsEquals([6, 'foo', []], [6, 'foo', []])).toBe(false);
	});

	test('[6, "foo", a[]], [6, "foo", a[]]', () => {
		const a = [];
		expect(argsEquals([6, 'foo', a], [6, 'foo', a])).toBe(true);
	});

	test('[6, {}], [6, {}]', () => {
		expect(argsEquals([6, {}], [6, {}])).toBe(false);
	});

	test('[6, a{}], [6, a{}]', () => {
		const a = {};
		expect(argsEquals([6, a], [6, a])).toBe(true);
	});

	test('[6, a{}, b[], "x", null], [6, a{}, b[], "x", null]', () => {
		const a = {};
		const b = [];
		expect(argsEquals([6, a, b, 'x', null], [6, a, b, 'x', null])).toBe(true);
	});

	test('[6, a{}, b[], "x", null], [a{}, b[], "x", null]', () => {
		const a = {};
		const b = [];
		expect(argsEquals([6, a, b, 'x', null], [a, b, 'x', null])).toBe(false);
	});
});

describe('TEST shallowEquals', () => {
	test('1 2', () => {
		const res = shallowEquals(1, 2);
		expect(res).toBe(false);
	});

	test('4 4', () => {
		const res = shallowEquals(4, 4);
		expect(res).toBe(true);
	});

	test('test tost', () => {
		const res = shallowEquals('test', 'tost');
		expect(res).toBe(false);
	});

	test('test test', () => {
		const res = shallowEquals('test', 'test');
		expect(res).toBe(true);
	});

	test('test 7', () => {
		const res = shallowEquals('test', 7);
		expect(res).toBe(false);
	});

	test('[1] [4]', () => {
		const res = shallowEquals([1], [4]);
		expect(res).toBe(false);
	});

	test('[1 2 3] [1 2 3]', () => {
		const res = shallowEquals([1, 2, 3], [1, 2, 3]);
		expect(res).toBe(true);
	});

	test('{0:1 1:2 2:3} [1 2 3]', () => {
		const res = shallowEquals({ 0: 1, 1: 2, 2: 3 }, [1, 2, 3]);
		expect(res).toBe(false);
	});

	test('{0:1 1:2 2:3} {0:1 1:2 2:3}', () => {
		const res = shallowEquals({ 0: 1, 1: 2, 2: 3 }, { 0: 1, 1: 2, 2: 3 });
		expect(res).toBe(true);
	});
});
