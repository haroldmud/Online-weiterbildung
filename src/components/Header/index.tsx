import Button from "../ui/Button";
const Header =()=> {
  return (
    <header className="bg-black h-12 flex justify-center">
      <div className=" max-w-[1000px] w-full relative flex items-center">
        <div className="w-full absolute flex justify-end">
          <Button name="Se connecter"/>
        </div>
      </div>
    </header>
  );
}

export default Header;