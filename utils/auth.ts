import { db } from '@/db';
import { UsersTable } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export const getUserByClerkId = async () => {
  const { userId } = await auth();

  const user = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.clerkId, userId!))
    .limit(1);

  return user[0];
};
