// Usage: npm run import-archive

import archive from '../data/blog/archive-stephenesch-music.json' with { type: 'json' };
import { Readable } from 'stream';
import fs from 'fs';

const download = async (url, path) =>
  Readable.fromWeb((await fetch(url)).body).pipe(fs.createWriteStream(path));

async function importArchive() {
  const ratings = archive.results.map(
    ({
      key,
      title,
      release_year,
      rating,
      rating_date,
      artist: { name: artistName },
    }) => {
      return {
        key,
        title,
        release_year,
        rating,
        rating_date,
        artist: artistName,
      };
    }
  );
  for (const {
    key,
    title,
    release_year,
    rating,
    rating_date,
    artist,
  } of ratings) {
    const ratingOutOfFive = rating / 2;
    const blogPath = `data/blog/${key}.mdx`;
    const blogContent = `---
title: '${artist.replaceAll("'", "''")}: ${title.replaceAll("'", "''")} (${release_year})'
date: '${rating_date.substring(0, 10)}'
lastmod: '${rating_date.substring(0, 10)}'
tags:
  ['Artist ${artist.replaceAll("'", "''")}', 'Rated ${ratingOutOfFive}', 'Release Year ${release_year}', 'Release Decade ${`${release_year}`.substring(0, 3)}0']
summary: 'Rated ${ratingOutOfFive}'
authors: ['default']
images: ['/content/images/${key}.jpg']
---

export const data = {
  key: '${key}',
  title: '${title.replaceAll("'", "\\'")}',
  release_year: ${release_year},
  rating: ${rating},
  rating_date: '${rating_date}',
  artist: '${artist.replaceAll("'", "\\'")}',
};

<MusicRating data={data} />
`;

    try {
      fs.writeFileSync(blogPath, blogContent);
    } catch (e) {
      console.error(e);
      console.error(`failed to write `, blogPath);
    }

    const albumArtUrl = `https://music.stephenesch.co.uk/album-art/${key}`;
    const albumArtPath = `public/content/images/${key}.jpg`;
    try {
      await download(albumArtUrl, albumArtPath);
    } catch (e) {
      console.error(e);
      console.error(`failed to download `, albumArtUrl);
    }
  }
}

importArchive();
