import { db } from '@/db';
import { UsersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';

export const handleSignIn = async (user: User): Promise<boolean> => {
  const { email, name, image } = user;

  try {
    const existingUser = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.email, email!))
      .limit(1);

    if (existingUser.length === 0) {
      await db.insert(UsersTable).values({
        email: email!,
        name: name || '',
        image: image || '',
      });
    }
    return true;
  } catch (error) {
    console.error('Error during user insertion', error);
    return false;
  }
};
