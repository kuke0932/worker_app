const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  status: state => state.user.status,
  loginStatus: state => state.user.loginStatus,
  message: state => state.user.message
}
export default getters
