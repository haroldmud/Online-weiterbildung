import Link from "next/link";

type ButtonProps = {
  name: string,
  route: string
}

const Button: React.FC<ButtonProps> = ({ name, route }) => {
  return (
    <Link href={route} className="text-white bg-red-600 rounded-sm text-sm md:px-4 py-2 md:w-fit w-full right-8 hover:bg-red-500 flex justify-center">{name}</Link>
  );
}

export default Button;
