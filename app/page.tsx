import UploadForm from '@/features/upload/components/upload-form';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-400">Kindian</h1>
        <h2 className="font-semibold text-gray-900">
          Upload your kindle notes on txt format and get a markdown file
        </h2>
      </div>
      <UploadForm />
    </div>
  );
}
