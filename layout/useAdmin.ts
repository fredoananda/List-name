import { atom, useAtom } from 'jotai'
import { api } from './api'
import { z } from 'zod'

const loggedInAtom = atom(false)
const loadingAtom = atom(true)

export const adminSchema = z.object({
  token: z.string(),
})

export const verifySchema = z.object({
  id: z.string(),
  staff_id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  password: z.string(),
  profile: z.object({
    user_id: z.string(),
    username: z.string(),
    img_url: z.string(),
    country: z.string(),
    job_title: z.string(),
    about: z.string()
  }),
  department: z.string(),
  menu_access: z.array(
    z.union([
      z.object({
        name: z.string(),
        sub: z.array(
          z.object({
            _id: z.string(),
            name: z.string(),
            sub: z.array(z.unknown()),
            order: z.number(),
            link: z.string()
          })
        ),
        order: z.string(),
        link: z.string(),
        id: z.string()
      }),
      z.null()
    ])
  )
})



export type AdminSchema = z.infer<typeof adminSchema>
export type VerifySchema = z.infer<typeof verifySchema>

const adminAtom = atom<VerifySchema | null>(null)

export const useAdmin = () => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom)
  const [admin, setAdmin] = useAtom(adminAtom)
  const [loading, setLoading] = useAtom(loadingAtom)

  const login = async (staffId: string, password: string) => {
    try {
      setLoading(true)
      const { data } = await api.post<AdminSchema>('/auth/login', {
        staff_id: staffId,
        password,
      })
      
      const admin = adminSchema.parse(data)
      localStorage.setItem('admin_access_token', admin.token)
      await validate()
      setLoggedIn(true)
    } catch (error) {
      setLoading(false)
      throw error
    } 
  }

  const validate = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_access_token')
      if (!token) {
        return
      }
      
      const { data } = await api.get<VerifySchema>('/admins/verify')
      const parsed = verifySchema.parse(data)
      setAdmin(parsed)
      setLoggedIn(true)
    } catch (error) {
      localStorage.removeItem('admin_access_token')
    } finally {
      setLoading(false)
    }
  }


  const logout = () => {
    localStorage.removeItem('admin_access_token')
    setLoggedIn(false)
    setAdmin(null)
  }

  return {
    loggedIn,
    validate,
    login,
    logout,
    admin,
    loading,
  }
}
