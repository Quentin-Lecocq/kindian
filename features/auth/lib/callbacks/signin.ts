import { db } from '@/db';
import { UsersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';

export const handleSignIn = async (user: User): Promise<boolean> => {
  try {
    const existingUser = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.email, user.email!))
      .limit(1);

    if (existingUser.length === 0) {
      await db.insert(UsersTable).values({
        email: user.email!,
        name: user.name || '',
        image: user.image || '',
      });
    }
    return true;
  } catch (error) {
    console.error('Error during user insertion', error);
    return false;
  }
};
