import { getStatistics } from '@/features/statistics/actions/statistics';
import StatisticsWrapper from '@/features/statistics/components/statistics-wrapper';
import { NextPage } from 'next';

const StatisticsPage: NextPage = async () => {
  const statistics = await getStatistics();
  console.log(statistics);
  // const t = await getScopedI18n('statistics_page');

  return (
    <>
      <h1>Statistics Wrapper</h1>
      <StatisticsWrapper statistics={statistics} />
    </>
  );
};

export default StatisticsPage;
