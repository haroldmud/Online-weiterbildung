"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CreateFormationDto } from "../../../../backend/src/formation/dto/create-formation.dto"
import { IoIosArrowRoundBack } from "react-icons/io";
import { init } from "next/dist/compiled/webpack/webpack";


const FormationDetails = ({params: initialParams}: {
    params: {formationId: string}
}) => {
    const [formation, setFormation] = useState<CreateFormationDto | null>(null);
    const [formationId, setFormationId] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
      const fetchParams = async () => {
        const resolveParams = await initialParams;
        setFormationId(resolveParams.formationId);
      }
      fetchParams();
    },[initialParams])
    useEffect(() => {
        try{
            const token = localStorage.getItem('token');
            if(!token) {
                router.push('/auth/login');
            }
            const fetchOneDate = async () => {
                const response = await fetch(`http://localhost:3000/formation/${formationId}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` || '',
                  },
                });
                if(!response.ok) {
                    console.error('Something went wrong');
                }
                const data =  await response.json();
                setFormation(data);
                console.log('Data:', data);
                console.log(token)
            }
            fetchOneDate();
        } catch(error) {
            console.error("This is what's going wrong:",error);
        }
    },[formationId])
    return (
        <section>
        <div className="flex flex-col gap-4 mt-8 ">
            <button onClick={()=> router.back()} className="text-4xl font-bold">
              <IoIosArrowRoundBack />
            </button>
          <div className="py-10 w-9/12">
            <a href="#" className="text-4xl hover:underline">{formation?.title}</a>
            <img className="h-[22rem] w-full object-cover rounded-md" src={formation?.image} alt="content image" />
          </div>
          <div className="flex items-center w-6/12 text-gray-500">
            <div className=" flex flex-col gap-4">
              <p className="text-red-600 text-sm">{formation?.price}{" € ou 2 paiements mensuel de"}{" "}{formation?.wholesalePrice}{" €"}</p>
              <p>{formation?.description}</p>
            </div>
          </div>
        </div>
      </section>
    )
}

export default FormationDetails;
