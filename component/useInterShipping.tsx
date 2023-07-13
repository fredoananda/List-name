import { atom, useAtom } from 'jotai'
import { z } from 'zod'
import { toast } from '../helpers/SweetAlert'
import { api } from '../helpers/api'

export const interShippingSchema = 
  z.object({
    id : z.string(),
    shippingName: z.string(),
    isInsurance: z.string(),
    isArchive: z.boolean(),
    totalUser : z.number()
  })
export const internationalShippingSchema = z.array(interShippingSchema)


export type interShippingAll = z.infer<typeof internationalShippingSchema>
export type interShipping = z.infer<typeof interShippingSchema>

const interShippingAllAtom = atom<interShippingAll>([])
const interShippingAtom = atom<interShipping| null>(null)

export const useInterShipping = () => {
  const [interShippingAll, setInterShippingAll] = useAtom(interShippingAllAtom)
  const [interShipping, setInterShipping] = useAtom(interShippingAtom)
  // const [interShipping]
  const fetchInterShipping = async () => {
    try {
      const { data } = await api.get('/insurance')

      setInterShippingAll(data)

    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')

    }
  }

  const findOneInterShipping = async (id : string) => {
    try {
      const { data } = await api.get(`/insurance/${id}`)

      return data
    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')
    }
  }

  const addInterShipping = async (payload : object) => {
    try {
      const { data } = await api.post('/insurance', payload)
      
      fetchInterShipping()
      toast('success', 'Success add International Shipping')
    } catch (error) {
      console.log(error);
      
      toast('error', 'Ooops!! somethinh wrong')
    }
  }

  const updateInterShipping = async (id:string, payload : object) => {
    try {
      const { data } = await api.put(`/insurance/${id}`, payload)
      
      fetchInterShipping()
      toast('success', 'Success edit International Shipping')
    } catch (error) {
      
      toast('error', 'Ooops!! somethinh wrong')
    }
  }

  const archiveInterShipping = async (id:string) => {
    try {
      const { data } = await api.put(`/insurance/archive/${id}`, {
        isArchive : true 
      })
      
      toast('success', 'Success edit International Shipping')
      fetchInterShipping()
    } catch (error) {
      
      toast('error', 'Ooops!! somethinh wrong')
    }
  }


  return {
    fetchInterShipping,
    addInterShipping,
    findOneInterShipping,
    updateInterShipping,
    archiveInterShipping,
    interShippingAll,
    interShipping
  }

}
