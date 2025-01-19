import { db } from '@/db';
import { SelectUser } from '@/types/db';
import { auth } from '@clerk/nextjs/server';

export const getUserByClerkId = async (): Promise<SelectUser> => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    const user = await db.query.UsersTable.findFirst({
      where: (table, { eq }) => eq(table.clerkId, userId!),
    });

    if (!user) throw new Error('User not found in database');
    return user;
  } catch (error) {
    console.error('Error fetching user', error);
    throw new Error('Failed to fetch user');
  }
};
