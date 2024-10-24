"use client"
 
import Card from "../ui/Card";
import CardReversed from "../ui/CardReversed";
import { CreateFormationDto } from "../../../backend/src/formation/dto/create-formation.dto";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useState } from "react";

interface CreateFormationExtended extends CreateFormationDto {
  id: string;
};

const Content = () => {
  const [formation, setFormation] = useState<CreateFormationExtended[] | []>([]);

  useEffect(() => {
    try{
      const featchData = async () => {
        const response = await fetch('http://localhost:3000/formation');
        if(!response.ok){
          throw new Error('Something went wrong')
        }
        const data = await response.json();
        setFormation(data);
      }

      featchData()
    } catch(error){
      console.log(error)
    }
  }, [])

  return (
    <section>
      {
        formation.map((item, index) => {
          if(index % 2 === 0) {
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
            )
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
            )
          }
        })
      }
    </section>
  );
}

export default Content;
