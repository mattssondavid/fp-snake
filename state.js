const State = run => ({
    run,
    map: f => State(s => {
        const {state, value} = run(s); // Run gives State(!)
        // this :: F a
        // f :: a -> b
        // value :: a
        // nextValue :: b
        return {value: f(value), state};
    }),
    ap: v => State(s => {
        const {state, value} = run(s);
        return v.map(value).run(state);
    })
});
State.pure = value => State(state => ({state, value }));

module.exports = State;