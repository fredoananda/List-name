import { atom, useAtom } from 'jotai'
import { z } from 'zod'
import { api } from '../helpers/api'
import { toast } from '../helpers/SweetAlert'

export const warehouseSchema = z.object({
  address_in_japanese: z.object({
    address: z.string(),
    city: z.string(),
    building: z.string(),
    country: z.string(),
    email: z.string(),
    phone_number: z.string(),
    postal_code: z.string(),
    province: z.string(),
    receiver_name: z.string()
  }),
  address_in_english: z.object({
    address: z.string(),
    city: z.string(),
    building: z.string(),
    country: z.string(),
    email: z.string(),
    phone_number: z.string(),
    postal_code: z.string(),
    province: z.string(),
    receiver_name: z.string()
  }),
  settings: z.object({
    warehouse_for_hurry_request: z.boolean(),
    warehouse_for_post_request: z.boolean(),
    warehouse_for_assists_the_request: z.boolean(),
    warehouse_for_post_recommendation: z.boolean(),
    warehouse_for_auction: z.boolean()
  }),
  name: z.string(),
  id_warehouse: z.string(),
  status: z.string(),
  created_by: z.string(),
  updated_by: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isArchive: z.boolean(),
  id: z.string()
})

export const warehousesSchema = z.array(
  warehouseSchema
)

export const warehousePricingSchema = z.object({
  warehouseId: z.number(),
  freeStorage: z.number(),
  pricePerDay: z.number(),
  photoFee: z.number(),
  packingTypeA: z.object({
    price : z.number(),
    isActive : z.boolean()
  }),
  packingTypeB: z.object({
    price : z.number(),
    isActive : z.boolean()
  }),
  packingTypeC: z.object({
    price : z.number(),
    isActive : z.boolean()
  }),
  customPacking: z.object({
    price : z.number(),
    isActive : z.boolean()
  }),
  paymentPercentage: z.number(),
  paymentFee: z.number(),
  systemPecentage: z.number(),
  systemFee: z.number(),
  minimumTrx: z.number(),
  minumumPoint: z.number(),
  points: z.number()

})


export type Warehouses = z.infer<typeof warehousesSchema>
export type Warehouse = z.infer<typeof warehouseSchema>
export type WarehousePricing = z.infer<typeof warehousePricingSchema>

const warehouseAtom = atom<Warehouses>([])
const loadingAtom = atom<boolean>(false)
const warehousePricingAtom = atom<WarehousePricing | null>(null)

export const useWarehouse = () => {
  const [warehouse, setWarehouse] = useAtom(warehouseAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const [warehousePricing, setwWrehousePricing] = useAtom(warehousePricingAtom)

  const fetchWarehouse = async (query?: string) => {
    setLoading(true)
    try {
      let { data } = await api.get('/warehouse')

      if (query) data = data.filter((el: Warehouse) => el?.name.toLowerCase().includes(query))

      setWarehouse(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const findOneWarehouse = async (id?: string) => {
    setLoading(true)
    try {
      let { data } = await api.get(`/warehouse/${id}`)

      fetchWarehouse()

      return data
    } catch (error) {
      // console.log(error)
      toast("error", "oop error !!!")
    } finally {
      setLoading(false)
    }
  }

  const archiveWarehouse = async (id?: string, isArchive?: any) => {
    setLoading(true)
    try {
      let { data } = await api.put(`/warehouse/${id}`, { isArchive: isArchive })

      fetchWarehouse()
      toast("success", "success archived")
      return data
    } catch (error) {
      // console.log(error)
      toast("error", "oop error !!!")
    } finally {
      setLoading(false)
    }
  }


  const addWarehouse = async (payload: any) => {
    setLoading(true)
    try {
      await api.post('/warehouse', payload)
      fetchWarehouse()
      toast('success', 'Added Successfully')
    } catch (error) {
      toast('error', 'Uploaded failed')
    } finally {
      setLoading(false)
    }
  }

  const fetchWarehousePricing = async (query?: string) => {
    setLoading(true)
    try {
      let { data } = await api.get('/warehouse/pricing/all')
      console.log(data[0], "THIS DATA WAREHOUSE PRICING");

      setwWrehousePricing(data[0])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const editWarehousePricing = async (payload?: object) => {
    setLoading(true)
    try {
      let { data } = await api.put('/warehouse/pricing/update', payload)
      console.log(data[0], "THIS DATA WAREHOUSE PRICING");
      toast("success", "Success Updated Warehouse Pricing")
    } catch (error) {
      console.log(error)
      toast("error", "Opps Something Error !!!")
    } finally {
      setLoading(false)
    }
  }
  


  return {
    warehouse,
    fetchWarehouse,
    addWarehouse,
    loading,
    findOneWarehouse,
    archiveWarehouse,
    fetchWarehousePricing,
    warehousePricing,
    editWarehousePricing
  }

}
