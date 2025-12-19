import { jwtDecode } from 'jwt-decode'

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('recipe_token')

  if (!token.value) return

  try {
    const decoded = jwtDecode(token.value)

    if (decoded.exp && decoded.exp > Date.now() / 1000) {
      return navigateTo('/dashboard')
    }
  } catch {
    // token invalide → on laisse passer
  }
})
