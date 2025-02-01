type SubHighlight = {
  id: string;
  startIndex: number;
  endIndex: number;
};

type MergedRange = {
  startIndex: number;
  endIndex: number;
  ids: string[];
};

export const mergeRanges = (highlights: SubHighlight[]): MergedRange[] => {
  if (!highlights?.length) return [];

  const sorted = [...highlights].sort((a, b) => a.startIndex - b.startIndex);
  const merged: MergedRange[] = [];
  let current = {
    startIndex: sorted[0].startIndex,
    endIndex: sorted[0].endIndex,
    ids: [sorted[0].id],
  };

  for (let i = 1; i < sorted.length; i++) {
    const highlight = sorted[i];
    if (highlight.startIndex <= current.endIndex) {
      current.endIndex = Math.max(current.endIndex, highlight.endIndex);
      current.ids.push(highlight.id);
    } else {
      merged.push(current);
      current = {
        startIndex: highlight.startIndex,
        endIndex: highlight.endIndex,
        ids: [highlight.id],
      };
    }
  }
  merged.push(current);
  return merged;
};
