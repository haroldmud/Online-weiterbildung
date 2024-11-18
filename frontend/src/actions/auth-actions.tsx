import { sendEmail } from "./email-actions";
import VerificationTemplate from "../../emails/verification-template";
import { generateSecureToken } from "@/helpers/generateToken";
import { CreateUserDto } from "../../../backend/src/users/dto/create-user.dto";
import * as bcrypt from "bcrypt";

export async function registerUser(user: Partial<CreateUserDto>) {
  try{
    const createdUser = await prisma.user.create({
      data: {
        ...user,
        password: user.password ? await bcrypt.hash(user.password, 10) : undefined,
      }
    })
  }
}
