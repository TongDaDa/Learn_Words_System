export default (state = [], action)=>{
    switch (action.type) {
        case 'ADD': return 123
        case 'INIT_STATE': return state;
    }
}