'use server';

export const uploadFile = async (
  prevState: { message: string | null },
  formData: FormData
) => {
  const file = formData.get('file') as File;
  console.log(file);
  console.log('from upload file server');

  return { message: 'File uploaded successfully' };
};
