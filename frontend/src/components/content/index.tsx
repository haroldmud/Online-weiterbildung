"use client";

import Card from "../ui/Card";
import CardReversed from "../ui/CardReversed";
// import { CreateFormationDto } from "../../../../backend/src/formation/dto/create-formation.dto";
import {
  useEffect,
  useState,
} from "react";

const Content = () => {
  const [formation, setFormation] = useState<any | []>(
    []
  );
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      const featchData = async () => {
        const response = await fetch("http://localhost:3001/formation");
        if (!response.ok) {
          setError(true);
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setFormation(data);
      };

      featchData();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }, []);

  return formation.length === 0 && !error ? (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-24 h-24 border-8 border-red-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : formation.length === 0 && error ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-red-500 text-2xl font-bold">Error</div>
        <p className="mt-2 text-gray-600">Oops! Something went wrong.</p>
      </div>
    </div>
  ) : (
    <section>
      {formation.map((item:any, index:any) => {
        if (index % 2 === 0) {
          return (
            <Card
              key={index}
              image={item.image}
              price={item.price}
              wholesalePrice={item.wholesalePrice}
              title={item.title}
              desciption={item.description}
              route={`formation/${item.id}`}
            />
          );
        } else {
          return (
            <CardReversed
              key={index}
              image={item.image}
              price={item.price}
              wholesalePrice={item.wholesalePrice}
              title={item.title}
              desciption={item.description}
              route={`formation/${item.id}`}
            />
          );
        }
      })}
    </section>
  );
};

export default Content;
