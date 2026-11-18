import assert from 'node:assert/strict';
import test from 'node:test';
import { postDate, postSlug, publishedPosts } from '../src/lib/posts.ts';

const post = (id, date, filename) => ({ id, data: { date, filename } });

test('post URLs honour frontmatter filenames, falling back to collection IDs', () => {
  assert.equal(postSlug(post('source-name', '2025-01-01 12:00', 'public-slug')), 'public-slug');
  assert.equal(postSlug(post('source-name', '2025-01-01 12:00')), 'source-name');
});

test('published posts exclude the index stub and sort newest first without mutating input', () => {
  const posts = [
    post('older', '2024-02-29 12:00'),
    post('index', '2030-01-01 00:00'),
    post('newer', '2025-01-01 12:00'),
  ];
  assert.deepEqual(publishedPosts(posts).map(({ id }) => id), ['newer', 'older']);
  assert.deepEqual(posts.map(({ id }) => id), ['older', 'index', 'newer']);
});

test('post dates are interpreted as UTC regardless of the build timezone', () => {
  const original = process.env.TZ;
  try {
    for (const timezone of ['Europe/London', 'America/Los_Angeles', 'Pacific/Auckland']) {
      process.env.TZ = timezone;
      assert.equal(postDate('2025-07-01 00:30').toISOString(), '2025-07-01T00:30:00.000Z');
    }
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});

test('invalid and impossible dates fail clearly instead of changing post order silently', () => {
  for (const value of ['invalid', '2025-02-30 12:00', '2025-01-01 25:00']) {
    assert.throws(() => postDate(value), /Invalid post date/);
  }
});
