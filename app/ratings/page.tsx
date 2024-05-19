import { genPageMetadata } from 'app/seo';
import Link from 'next/link';
import { StarsRating } from '@/components/StarsRating';
import tagData from 'app/tag-data.json';

export const metadata = genPageMetadata({ title: 'Ratings' });

export default function Ratings() {
  const tagCounts = tagData as Record<string, number>;
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Explore Ratings
          </h1>
          <div className="flex space-x-4">
            <div className="basis-1/2">
              <h2 className="text-2xl">Rating:</h2>
              <ul>
                {Array.from(Array(10)).map((_, i) => {
                  const rating = 10 - i;
                  const ratingOutOfFive = rating / 2;
                  const tag = `rated-${`${ratingOutOfFive}`.replace('.', '')}`;
                  const count = tagCounts[tag] || 0;
                  return (
                    <li key={i}>
                      <Link href={`/tags/${tag}`} className="flex items-center">
                        <div>
                          <StarsRating rating={rating} />
                        </div>
                        ({count})
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl">Decade:</h2>
              <ul>
                {Array.from(Array(9)).map((_, i) => {
                  const decade = 1940 + i * 10;
                  const tag = `release-decade-${decade}`;
                  const count = tagCounts[tag] || 0;
                  return (
                    <li key={i}>
                      <Link
                        href={`/tags/${tag}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {decade} ({count})
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-2xl">Artist:</h2>
            <ul>
              {Object.entries(tagCounts)
                .filter(([tag]) => tag.startsWith('artist'))
                .map(([tag, count]) => {
                  return (
                    <li key={tag}>
                      <Link
                        href={`/tags/${tag}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {tag
                          .replace('artist-', '')
                          .replace('-', ' ')
                          .toUpperCase()}{' '}
                        ({count})
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
