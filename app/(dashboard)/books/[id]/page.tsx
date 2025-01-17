import TypographyH4 from '@/components/typography/typography-h4';

const BookPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <TypographyH4>Book {params.id}</TypographyH4>
    </div>
  );
};

export default BookPage;
