export function useAuth () {
  const cookie = useCookie<string | null>('recipe_token')

  const user = useState<User | null>('auth-user', () => null)

  const isLoggedIn = computed(() => !!cookie.value)

  async function fetchUser () {
    if (!cookie.value) {
      user.value = null
      return
    }

    const config = useRuntimeConfig()

    const res = await $fetch<ApiResponse<User>>(
      `${config.public.apiUrl}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${cookie.value}`
        }
      }
    )

    user.value = res.data
  }

  function logout () {
    cookie.value = null
    user.value = null
    navigateTo('/login')
  }

  return {
    user,
    isLoggedIn,
    fetchUser,
    logout
  }
}
