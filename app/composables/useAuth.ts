export function useAuth () {
  const cookie = useCookie<string | null>('recipe_token')

  const user = computed(() => {
    if (!cookie.value) return null

    try {
      const payload = cookie.value.split('.')[1]
      if (!payload) return null
      return JSON.parse(atob(payload))
    } catch {
      return null
    }
  })

  const isLoggedIn = computed(() => !!user.value)

  function logout () {
    cookie.value = null
    navigateTo('/login')
  }

  return {
    user,
    isLoggedIn,
    logout
  }
}
