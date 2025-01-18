export const cleanKindleTitle = (kindleTitle: string) => {
  let cleanedTitle = kindleTitle;

  if (cleanedTitle.startsWith('L')) {
    if (!/^(La|Le|Les)\b/.test(cleanedTitle)) {
      cleanedTitle = cleanedTitle
        .replace(/^L(?=[aeiouéèêëàâäîïôöûüù])/i, "L'")
        .replace(/^L(?=[bcdfghjklmnpqrstvwxz])/i, 'L ');
    }
  }

  cleanedTitle = cleanedTitle
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

  return cleanedTitle;
};
