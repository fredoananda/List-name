import { atom, useAtom } from 'jotai'
import { z } from 'zod'
import { toast } from '../helpers/SweetAlert'
import { api } from '../helpers/api'


export const contitionSchema = z.array(
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

export type Condition = z.infer<typeof contitionSchema>

const conditionAtom = atom<Condition>([])

export const useProductCondition = () => {
  const [conditions, setCondition] = useAtom(conditionAtom)

  const fetchCondition = async () => {
    try {
      const { data } = await api.get('/productCon')

      setCondition(data)

    } catch (error) {
      console.log(error);
      
      toast('error', 'Ooops!! somethinh wrong')

    }
  }


  const findOneCondition = async (id : string) => {
    try {
      const { data } = await api.get(`/productCon/${id}`)

      // setCondition(data)
      fetchCondition()
      return data
    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')

    }
  }

  const addCondition = async (name: string, code : string, color : string, isArchive: boolean) => {
    try {
      const { data } = await api.post('/productCon', {
        name,
        code,
        color,
        isArchive
      })
      
      fetchCondition()
      toast('success', 'Success add product Condition')
    } catch (error) {
      console.log(error);
      
      toast('error', 'Ooops!! somethinh wrong')
    }
  }

  const updateCondition = async (id:string, name: string, code : string, color : string) => {
    try {
      const { data } = await api.put(`/productCon/${id}`, {
        name,
        code,
        color,
      })
      
      fetchCondition()
      toast('success', 'Success edit product Condition')
    } catch (error) {
      
      toast('error', 'Ooops!! somethinh wrong')
    }
  }

  const archiveCon = async (id:string, isArchive: boolean) => {
    try {
      const { data } = await api.put(`/productCon/archive/${id}`, {
        archive: isArchive,
      });
    
      fetchCondition()
      toast('success', 'Success edit product Condition')
    } catch (error) {
      
      toast('error', 'Ooops!! somethinh wrong')
    }
  }


  return {
    fetchCondition,
    conditions,
    findOneCondition,
    updateCondition,
    archiveCon,
    addCondition
  }

}
