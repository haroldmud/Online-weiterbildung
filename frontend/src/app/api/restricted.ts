import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextAuth]";

export default async (req: any, res: { send: (arg0: { content?: string; error?: string; }) => void; }) => {
  const session = await getServerSession({ req, res: { headers: { cookie: req.headers.cookie } }, ...authOptions }); // authOptions is not supposed to be distructured but let's how it goes

  if (session) {
    res.send({
      content: "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
}
