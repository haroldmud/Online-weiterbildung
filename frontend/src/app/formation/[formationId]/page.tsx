"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md"; // Adding an icon for the error display

interface FormationParams {
  formationId: string;
}

interface FormationDetailsProps {
  params: FormationParams;
}

const FormationDetails = ({ params }: FormationDetailsProps) => {
  const [formation, setFormation] = useState<any | null>(null);
  const [formationId, setFormationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setFormationId(unwrappedParams.formationId);
    };
    unwrapParams();
  }, [params]);

  const fetchFormation = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/formation/${formationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
      });

      if (!response.ok) {
        setError(`Oops! Something went wrong (Error ${response.status})`);
        return;
      }

      const data = await response.json();
      setFormation(data);
      setError(null); // Clear any previous errors if fetch is successful
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (formationId) fetchFormation();
  }, [formationId]);

  return (
    <section className="mt-8">
      <button onClick={() => router.back()} className="text-4xl font-bold mb-4" title="Go back">
        <IoIosArrowRoundBack />
      </button>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex flex-col items-center gap-2">
          <MdErrorOutline className="text-6xl" />
          <p className="text-lg font-semibold">{error} or you are not <mark className="inline underline hover:text-red-600"><a href="/auth/login">logged in</a></mark> yet!</p>
          <a
            href="/"
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Go Home
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="py-10 w-9/12">
            <a href="#" className="text-4xl hover:underline">{formation?.title}</a>
            <img className="h-[22rem] w-full object-cover rounded-md" src={formation?.image} alt="content image" />
          </div>

          <div className="flex items-center w-6/12 text-gray-500">
            <div className="flex flex-col gap-4">
              <p className="text-red-600 text-sm">
                {formation?.price}{" € ou 2 paiements mensuel de"}{" "}{formation?.wholesalePrice}{" €"}
              </p>
              <p>{formation?.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FormationDetails;
