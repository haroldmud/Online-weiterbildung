import Button from "../ui/Button";

const Content = () => {
  return (
    <div className="flex gap-4 mt-8 ">
      <div className="py-10 w-9/12">
        <img className="h-[22rem] w-full object-cover rounded-md" src="https://www.benin.campusfrance.org/sites/pays/files/benin/styles/mobile_visuel_principal_page/public/formations%20pro.jpg?itok=Fb6u0xbO" alt="content image" />
      </div>
      <div className="flex items-center w-6/12 text-gray-500">
        <div className=" flex flex-col gap-4">
          <p className="text-red-600 text-sm">€150 ou 2 paiements mensuel de €80</p>
          <a href="#" className="text-3xl hover:underline">Développer son Audience : La stratégie derrière mes 4 MILLIARDS de vues en 2023 !</a>
          <p>
            La méthode la plus puissante pour créer une fidèle audience, récolter plusieurs nouveaux abonnés qualifiés et démultiplier ses ventes. 
          </p>
          <div>
            <Button name="Accedez à la formation"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
