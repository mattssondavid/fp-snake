const State = require('./state');

describe('State', () => {
    it('pure works', () => {
        expect(State.pure(1).run(2).value).toBe(1);
        expect(State.pure(1).run(2).state).toBe(2);
    });

    it('can map', () => {
        const addOne = val => val + 1;
        expect(State.pure(1).map(addOne).run().value).toBe(2);
        expect(State.pure(1).map(addOne).run(3).state).toBe(3);
    });

    it('can apply (i.e. ap(x))', () => {
        const addOne = State.pure(val => val + 1);
        expect(addOne.ap(State.pure(1)).run().value).toBe(2);
        expect(addOne.ap(State.pure(1)).run(3).state).toBe(3);
        expect(addOne.ap(State(x => ({state: x + 1, value: 1}))).run(3).state).toBe(4);
        expect(
            State(s => ({state: s + 1, value: val => val + 1}))
            .ap(State(x => ({state: x + 1, value: 1})))
            .run(3)
            .state
        ).toBe(5);
    });
});