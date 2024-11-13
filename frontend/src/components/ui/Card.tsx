import { ReactNode } from "react";
import Button from "./Button";

const Card = (props: {
  [x: string]: ReactNode; image: string | undefined; route: string;
}) => {
  return (
    <section className="mb-16">
      <div className="md:flex gap-4 mt-8 md:px-auto px-4">
      <a href="#" className="md:hidden block md:text-4xl text-3xl font-bold text-gray-500 hover:underline">{props.title}</a>
        <div className="py-10 md:w-9/12 w-full md:mt-0 -mt-6">
          <img className="h-[22rem] w-full object-cover rounded-md" src={props.image} alt="content image" />
        </div>
        <div className="flex items-center md:w-6/12 text-gray-500 md:mt-0 -mt-6">
          <div className=" flex flex-col md:gap-4 gap-2">
            <p className="text-red-600 text-sm">{props.price}{" € ou 2 paiements mensuel de"}{" "}{props.wholesalePrice}{" €"}</p>
            <a href="#" className="md:block hidden md:text-4xl text-2xl font-bold hover:underline">{props.title}</a>
            <p>{props.desciption}</p>
            <Button route={props.route} name="Accedez à la formation"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;
