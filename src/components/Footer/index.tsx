const Footer =()=> {
  return (
    <header className="bg-black h-12 flex justify-center py-10">
      <div className=" max-w-[1000px] w-full relative flex items-center">
        <div className="w-full absolute flex justify-center gap-10">
          <a href="#" className="text-sm text-gray-400">Conditions Générales de Vente</a>
          <a href="#" className="text-sm text-gray-400">Politique de Confidentialité</a>
        </div>
      </div>
    </header>
  );
}

export default Footer;