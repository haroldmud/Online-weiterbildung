import React from 'react'
import { sendEmail } from './email-actions'
import VerificationTemplate from '../../emails/verification-template'
import { generateSecureToken } from '../helpers/generateToken'
import { CreateUserDto } from '../../../backend/src/users/dto/create-user.dto'

interface VerificationTemplateProps {

  emailVerificationToken: string;

  username: string;

}

interface CreateUserDtoExt extends CreateUserDto {
  id: string;
}

export async function registerUser(user: Partial<CreateUserDtoExt>) {
  try {
    // Sends the user data to the backend for user creation
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const createdUser = await response.json();

    if (createdUser.error) {
      return createdUser;
    }

    // Generate a secure token to use for email verification
    const emailVerificationToken = generateSecureToken();

    // Send email with verification instructions
    await sendEmail({
      to: [createdUser.email],
      subject: 'Verify your email address',
      react: React.createElement(VerificationTemplate, {
        username: createdUser.username,
        emailVerificationToken,
      }),
    });

    return createdUser;
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred.' };
  }
}
