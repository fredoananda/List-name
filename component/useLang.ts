import { atom, useAtom } from 'jotai'
import { z } from 'zod'
import { toast } from '../helpers/SweetAlert'
import { api } from '../helpers/api'


export const languageSchema = z.array(
  z.object({
    name: z.string(),
    code: z.string(),
    color: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    total_user : z.number(),
    id: z.string()
  })
)

export type Language = z.infer<typeof languageSchema>

const languageAtom = atom<Language>([])

export const useLang = () => {
  const [language, setLanguage] = useAtom(languageAtom)

  const fetchLanguage = async () => {
    try {
      const { data } = await api.get('/supportlang')

      setLanguage(data)

    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')

    }
  }

  const addNewLanguage = async (item: any) => {
    try {
      const { data } = await api.post('/supportlang', item)

      await fetchLanguage()
      toast('success', 'Language Uploadded')

    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')

    }
  }

  const findOneLanguage = async (id : any) => {
    try {
      const { data } = await api.get(`/supportlang/${id}`)

      // setLanguage(data)
      fetchLanguage()
      return data
    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')

    }
  }

  const updateLanguage = async (id:string,item: any) => {
    try {
      const { data } = await api.put(`/supportlang/${id}`, item)

      await fetchLanguage()
      toast('success', 'Language Uploadded')

    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')

    }
  }

  const archiveLanguage = async (id:string,status: any) => {
    try {
      const { data } = await api.put(`/supportlang/archive/${id}`, {
        status
      })

      await fetchLanguage()
      toast('success', 'Language Uploadded')

    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')

    }
  }

  return {
    language,
    fetchLanguage,
    addNewLanguage,
    findOneLanguage,
    updateLanguage,
    archiveLanguage
  }

}
