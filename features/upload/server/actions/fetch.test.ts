import { describe, expect, it } from 'vitest';
import { fetchBooksCover } from './fetch';

describe('fetchBooksCover', () => {
  it('should return a valid cover URL for a given book title', async () => {
    const title = 'Atomic Habits';
    const coverUrl = await fetchBooksCover(title);
    expect(coverUrl).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png)$/);
  });

  it('should return a default image URL if no cover is found', async () => {
    const title = 'Non-existent book';
    const coverUrl = await fetchBooksCover(title);
    expect(coverUrl).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png)$/);
  });

  it('should throw an error if the API fails', async () => {
    const title = 'Atomic Habits';

    vi.spyOn(global, 'fetch').mockRejectedValueOnce(
      new Error('API unavailable')
    );

    await expect(fetchBooksCover(title)).rejects.toThrow('API unavailable');

    vi.restoreAllMocks();
  });
});
