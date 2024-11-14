import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data } = useSession();
  return (
    <div>
      {data ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  )
} 
