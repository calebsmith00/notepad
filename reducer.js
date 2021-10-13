export default function test(state = [], action) {
    switch (action.type) {
        case 'TEST':
            return state.concat([action])
        default:
            return state
    }
}