import Link from "next/link";

type ButtonProps = {
  name: string 
}

const Button: React.FC<ButtonProps> = ({ name }) => {
  return (
    <Link href="/" className="text-white bg-red-600 rounded-sm text-sm px-4 py-2  right-8">{name}</Link>

  );
}

export default Button;
