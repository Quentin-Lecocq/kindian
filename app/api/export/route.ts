import { Book } from '@/features/export/types';
import { APIResponse } from '@/types/api';
import { NextResponse } from 'next/server';

type MarkdownFile = {
  content: string;
  filename: string;
};

export const POST = async (req: Request) => {
  try {
    const { books } = await req.json();

    if (!Array.isArray(books)) {
      return NextResponse.json<APIResponse<null>>(
        {
          data: null,
          error: 'Invalid books data',
        },
        { status: 422 }
      );
    }

    const markdownFiles: MarkdownFile[] = books.map((book: Book) => {
      const bookMd = `# ${book.title} - ${book.author}\n\n## Highlights\n\n`;
      const highlightsMd = book.highlights
        .map((h) => `- ${h.quote}\n  ${h.info}`)
        .join('\n\n');

      return {
        content: bookMd + highlightsMd,
        filename: `${book.title.toLowerCase().replace(/\s+/g, '-')}.md`,
      };
    });

    return NextResponse.json<APIResponse<MarkdownFile[]>>(
      {
        data: markdownFiles,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating markdown:', error);
    return NextResponse.json<APIResponse<null>>(
      {
        data: null,
        error: 'Failed to generate markdown',
      },
      { status: 500 }
    );
  }
};
