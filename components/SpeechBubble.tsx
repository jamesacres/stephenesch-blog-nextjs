'use client';

import React from 'react';

export default function SpeechBubble({ children }) {
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 250);
  }, []);
  return (
    <div
      className={`flex items-center justify-end transition-opacity duration-500 ease-in`}
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <div
        className="my-6 flex-1 rounded-lg bg-yellow-500 p-4"
        style={{ maxWidth: 500 }}
      >
        <p className="text-white-500 dark:text-white-400 text-lg leading-7">
          {children}
        </p>
      </div>
    </div>
  );
}
