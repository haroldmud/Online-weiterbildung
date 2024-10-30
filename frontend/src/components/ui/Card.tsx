import { ReactNode } from "react";
import Button from "./Button";

const Card = (props: {
  [x: string]: ReactNode; image: string | undefined; route: string;
}) => {
  return (
    <section>
      <div className="flex gap-4 mt-8 ">
        <div className="py-10 w-9/12">
          <img className="h-[22rem] w-full object-cover rounded-md" src={props.image} alt="content image" />
        </div>
        <div className="flex items-center w-6/12 text-gray-500">
          <div className=" flex flex-col gap-4">
            <p className="text-red-600 text-sm">{props.price}{" € ou 2 paiements mensuel de"}{" "}{props.wholesalePrice}{" €"}</p>
            <a href="#" className="text-4xl hover:underline">{props.title}</a>
            <p>{props.desciption}</p>
            <div>
              <Button route={props.route} name="Accedez à la formation"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;