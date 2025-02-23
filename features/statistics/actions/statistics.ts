import { getStatisticsDB } from '../db/statistics';

export const getStatistics = async () => {
  const statistics = await getStatisticsDB();

  return {
    booksCount: statistics.booksCount ?? 0,
    highlightsCount: statistics.highlightsCount ?? 0,
    notesCount: statistics.notesCount ?? 0,
    tagsCount: statistics.tagsCount ?? 0,
    usersCount: statistics.usersCount ?? 0,
  };
};
