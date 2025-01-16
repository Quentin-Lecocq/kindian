import { db } from '@/db';
import { UsersTable } from '@/db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const match = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.clerkId, user.id));

  if (match.length === 0) {
    console.log('creating new user');
    await db.insert(UsersTable).values({
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress || '',
      name: user.fullName || user.username || 'unknown',
      image: user.imageUrl || '',
    });
  }

  redirect('/dashboard');
};

const NewUser = async () => {
  await createNewUser();

  return <p>...loading</p>;
};

export default NewUser;
