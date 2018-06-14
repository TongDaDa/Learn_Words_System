export default namespace => ({
    namespace,
    state: {
        currentState:'1123'
    },
    effects: {
        *yy (){

        }
    },
    reducers: {
        UPDATE(state) {
            return state + 1;
        },
    },
})