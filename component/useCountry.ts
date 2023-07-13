import { atom, useAtom } from 'jotai'
import { z } from 'zod'
import { toast } from '../helpers/SweetAlert'
import { api } from '../helpers/api'

export const schema = z.object({
  name: z.string(),
  country_name: z.string(),
  country_code: z.string(),
  color_code: z.string(),
  img_country_url: z.string(),
  created_by: z.string(),
  updated_by: z.null(),
  created_at: z.string(),
  updated_at: z.string(),
  calculating_usage: z.object({
    hurry_request: z.number(),
    request: z.number(),
    trip: z.number(),
    post_recomendation: z.number(),
    auction: z.number()
  }),
  isArchive: z.boolean(),
  id: z.string(),
  total_user : z.number()
})

export const countrySchema = z.array(
  schema
)

export type Country = z.infer<typeof countrySchema>
export type Schema = z.infer<typeof schema>

const countryAtom = atom<Country>([])

export const useCountry = () => {
  const [country, setCountry] = useAtom(countryAtom)

  const fetchCountry = async () => {
    try {
      const { data } = await api.get('/country')
  
      setCountry(data)      
    } catch (error) {
      toast('error', 'Ooops!! somethinh wrong')
    }
  }
  
  const addNewCountry = async (country : any, file: File | null) => {
    try {
      console.log(country, "< DATA BELAKANG COU");
      // const formData = new FormData();
      // if (file) {
      //   formData.append('image', file);
      // }
      // formData.append('country_name', country.country_name);
      // formData.append('country_code', country.country_code);
      // formData.append('color_code', country.color_code);
      // console.log(formData, "< DATA BELAKANG");
      
      const { data } = await api.post('/country', country);
  
      fetchCountry();
      toast('success', 'Country Uploaded');
    } catch (error) {
      toast('error', 'Oops!! Something went wrong');
    }
  };

  const editCountry = async (country : any, file: File | null) => {
    try {

      // const formData = new FormData();
      // if (file) {
      //   formData.append('image', file);
      // }
      // formData.append('country_name', country.country_name);
      // formData.append('country_code', country.country_code);
      // formData.append('color_code', country.color_code);
      // console.log(formData, "< DATA BELAKANG");
      
      const { data } = await api.put(`/country/${country.id}`, country);
  
      fetchCountry();
      toast('success', 'Country Uploaded');
    } catch (error) {
      toast('error', 'Oops!! Something went wrong');
    }
  };

  const findOneCountry = async (id: any) => {
    try {
      
      const { data } = await api.get(`/country/${id}`);
  
      fetchCountry();
      return data
    } catch (error) {
      toast('error', 'Oops!! Something went wrong');
    }
  };

  const archiveCountry = async (id: any, archive : boolean) => {
    try {
      
      const { data } = await api.put(`/country/archive/${id}`,{archive});
  
      fetchCountry();
      toast('success', 'Country Uploaded');
    } catch (error) {
      toast('error', 'Oops!! Something went wrong');
    }
  };
  

  return {
    country,
    fetchCountry,
    addNewCountry,
    findOneCountry,
    editCountry,
    archiveCountry
  }

}
