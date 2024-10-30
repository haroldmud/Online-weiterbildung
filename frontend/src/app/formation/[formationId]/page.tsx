"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

interface FormationParams {
  formationId: string;
}

interface FormationDetailsProps {
  params: FormationParams;
}

const FormationDetails = ({ params }: FormationDetailsProps) => {
  const [formation, setFormation] = useState<any | null>(null);
  const [formationId, setFormationId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const unwrapParams = async() => {
      const unwrappedParams = await params;
      setFormationId(unwrappedParams.formationId);
      console.log('Unwrapped params:', unwrappedParams);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchFormation = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/formation/${formationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
      });

      if (!response.ok) {
        console.error('Something went wrong, status', response.status);
        return;
      }

      const data = await response.json();
      setFormation(data);
      console.log('Data:', data);
      console.log(token);
    };
    if(formationId) fetchFormation();
  }, [formationId]);

  return (
    <section>
      <div className="flex flex-col gap-4 mt-8 ">
        <button onClick={() => router.back()} className="text-4xl font-bold" title="Go back">
          <IoIosArrowRoundBack />
        </button>
        <div className="py-10 w-9/12">
          <a href="#" className="text-4xl hover:underline">{formation?.title}</a>
          <img className="h-[22rem] w-full object-cover rounded-md" src={formation?.image} alt="content image" />
        </div>
        <div className="flex items-center w-6/12 text-gray-500">
          <div className="flex flex-col gap-4">
            <p className="text-red-600 text-sm">{formation?.price}{" € ou 2 paiements mensuel de"}{" "}{formation?.wholesalePrice}{" €"}</p>
            <p>{formation?.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormationDetails;
