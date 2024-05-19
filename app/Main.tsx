import Link from '@/components/Link';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import { formatDate } from 'pliny/utils/formatDate';
import NewsletterForm from 'pliny/ui/NewsletterForm';
import Image from '@/components/Image';
import SpeechBubble from '@/components/SpeechBubble';

const MAX_DISPLAY = 5;

export default function Home({ posts }) {
  return (
    <>
      <div>
        <div>
          <div className="flex flex-row">
            <div className="flex items-center justify-end">
              <Image
                alt="Vinyl"
                src="/static/images/logo.png"
                width={100}
                height={100}
              />
            </div>
            <div className="basis-3/4">
              <SpeechBubble>{siteMetadata.description}</SpeechBubble>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-6xl">
            Ratings
          </h1>
          <p className="my-8">
            <Link
              href="/ratings"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Explore ratings
            </Link>
          </p>
          <hr className="my-8" />
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-6xl">
            Recently Published
          </h1>
        </div>
        <ul>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images, readingTime } =
              post;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <Link href={`/${slug}`}>
                          <time dateTime={date}>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                          {images?.length > 0 && (
                            <Image
                              className="mt-2.5"
                              alt=""
                              src={images[0]}
                              width={200}
                              height={200}
                            />
                          )}
                        </Link>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          {readingTime?.text ? (
                            <>{readingTime.text}</>
                          ) : (
                            'Read more'
                          )}{' '}
                          &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog/page/2"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Next"
          >
            Next &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  );
}
