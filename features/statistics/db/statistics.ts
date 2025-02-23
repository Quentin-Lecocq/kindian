import { prisma } from '@/lib/prisma';

export const getStatisticsDB = async () => {
  try {
    const [booksCount, highlightsCount, notesCount, tagsCount, usersCount] =
      await prisma.$transaction([
        prisma.book.count(),
        prisma.highlight.count(),
        prisma.note.count(),
        prisma.tag.count(),
        prisma.user.count(),
      ]);

    return {
      booksCount,
      highlightsCount,
      notesCount,
      tagsCount,
      usersCount,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: 'Error fetching statistics',
    };
  }
};
