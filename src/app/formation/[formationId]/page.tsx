"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CreateFormationDto } from "../../../../backend/src/formation/dto/create-formation.dto"
import { IoIosArrowRoundBack } from "react-icons/io";


const FormationDetails = ({params}: {
    params: {formationId: string}
}) => {
    const [formation, setFormation] = useState<CreateFormationDto | null>(null);
    const router = useRouter();
    useEffect(() => {
        try{
            const fetchOneDate = async () => {
                const response = await fetch(`http://localhost:3000/formation/${params.formationId}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` || '',
                  },
                });
                if(!response.ok) {
                    console.error('Something went wrong');
                }
                const data =  await response.json();
                setFormation(data);
            }
            fetchOneDate();
        } catch(error) {
            console.error("This is what's going wrong:",error);
        }
    },[params.formationId])
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
