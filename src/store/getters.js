const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routes: state => state.user.routes,
  baseURL: state => state.settings.baseURL
}
export default getters
