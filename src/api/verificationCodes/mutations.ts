// import AppError from '@/lib/errors';
// import { createServerAction, ZSAError } from 'zsa';

// export const deleteEmailVerificationCodesByUserId = createServerAction()
//   .input(z.string())
//   .onError(error => {
//     if (!(error instanceof ZSAError)) {
//       throw new AppError('UNKNOWN_ERROR');
//     }
//     if (error) return { error: error?.message };
//     // TODO Log error to server
//   })
//   .handler(async ({ input }) => {
//     const result = await db
//       .delete(emailVerificationCodes)
//       .where(eq(emailVerificationCodes.userId, input));
//     if (result.changes) return { success: true };

//     return { success: false };
//   });
