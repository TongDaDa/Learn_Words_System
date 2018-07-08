export default namespace => ({
    namespace,
    state: {
        currentState:'4'
    },
    effects: {
        *yy (){}
    },
    reducers: {
        UPDATE(state) {
            return state + 1;
        },
    },
})