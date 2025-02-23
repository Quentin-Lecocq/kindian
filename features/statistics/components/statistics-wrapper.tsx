'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatisticsWrapperProps = {
  statistics: {
    booksCount: number | null;
    highlightsCount: number | null;
    notesCount: number | null;
    tagsCount: number | null;
    usersCount: number | null;
  };
};

const StatisticsWrapper = ({ statistics }: StatisticsWrapperProps) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {Object.entries(statistics).map(([key, value]) => {
        const label = key.replace('Count', '');

        return (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{value}</p>
            </CardContent>
          </Card>
        );
      })}
    </main>
  );
};

export default StatisticsWrapper;
