import { atom, useAtom } from 'jotai'
import { z } from 'zod'
import { toast } from '../helpers/SweetAlert'
import { api } from '../helpers/api'


export const categoriesSchema = z.array(
  z.object({
    name: z.string(),
    code: z.string(),
    color: z.string(),
    created_by: z.null(),
    isArchive: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    calculating_usage: z.object({
      hurry_request : z.number(),
      request : z.number(),
      trip : z.number(),
      post_recomendation : z.number(),
      auction : z.number()
    }),
    id: z.string()
  })
)

export const categorySchema = 
  z.object({
    name: z.string(),
    code: z.string(),
    color: z.string(),
    created_by: z.null(),
    isArchive: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    calculating_usage: z.object({
      hurry_request : z.number(),
      request : z.number(),
      trip : z.number(),
      post_recomendation : z.number(),
      auction : z.number()
    }),
    id: z.string()
  })


export type Categories = z.infer<typeof categoriesSchema>
export type Category = z.infer<typeof categorySchema>

const categoriesAtom = atom<Categories>([])
const categoryAtom = atom<Category| null>(null)

export const useProductCategory = () => {
  const [categories, setCategory] = useAtom(categoriesAtom)
  // const [category]
  const fetchCategory = async () => {
    try {
      const { data } = await api.get('/productCat')

      setCategory(data)

    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')

    }
  }

  const findOneCategory = async (id : string) => {
    try {
      const { data } = await api.get(`/productCat/${id}`)

      // setCategory(data)
      fetchCategory()
      return data
    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')

    }
  }

  const addCategory = async (name: string, code : string, color : string, isArchive: boolean) => {
    try {
      const { data } = await api.post('/productCat', {
        name,
        code,
        color,
        isArchive
      })
      
      fetchCategory()
      toast('success', 'Success add product category')
    } catch (error) {
      console.log(error);
      
      toast('error', 'Ooops!! somethinh wrong')
    }
  }

  const updateCategory = async (id:string, name: string, code : string, color : string) => {
    try {
      const { data } = await api.put(`/productCat/${id}`, {
        name,
        code,
        color,
      })
      
      fetchCategory()
      toast('success', 'Success edit product category')
    } catch (error) {
      
      toast('error', 'Ooops!! somethinh wrong')
    }
  }

  const archive = async (id:string, archive: boolean) => {
    try {
      const { data } = await api.put(`/productCat/archive/${id}`, {
        archive
      })
      
      toast('success', 'Success edit product category')
      fetchCategory()
    } catch (error) {
      
      toast('error', 'Ooops!! somethinh wrong')
    }
  }


  return {
    fetchCategory,
    categories,
    addCategory,
    findOneCategory,
    updateCategory,
    archive
  }

}
