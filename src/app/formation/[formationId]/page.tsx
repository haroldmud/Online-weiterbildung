"use client"
import { useEffect, useState } from "react"
import { CreateFormationDto } from "../../../../backend/src/formation/dto/create-formation.dto"

const FormationDetails = ({params}: {
    params: {formationId: string}
}) => {
    const [formation, setFormation] = useState<CreateFormationDto | null>(null);
    useEffect(() => {
        try{
            const fetchOneDate = async () => {
                const response = await fetch(`http://localhost:3000/formation/${params.formationId}`);
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
    },[])
    return (
        <section>
        <div className="flex gap-4 mt-8 ">
          <div className="py-10 w-9/12">
            <img className="h-[22rem] w-full object-cover rounded-md" src={formation?.image} alt="content image" />
          </div>
          <div className="flex items-center w-6/12 text-gray-500">
            <div className=" flex flex-col gap-4">
              <p className="text-red-600 text-sm">{formation?.price}{" € ou 2 paiements mensuel de"}{" "}{formation?.wholesalePrice}{" €"}</p>
              <a href="#" className="text-4xl hover:underline">{formation?.title}</a>
              <p>{formation?.description}</p>
            </div>
          </div>
        </div>
      </section>
    )
}

export default FormationDetails;
