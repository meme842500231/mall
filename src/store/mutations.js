export default {
    saveUsername(state, username) {
        console.log(username)
        state.username = username
    },
    saveCartCount(state, cartCount) {
        state.cartCount = cartCount
    }
}