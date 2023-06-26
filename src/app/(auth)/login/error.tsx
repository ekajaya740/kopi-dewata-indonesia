'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col justify-center space-y-2 items-center w-full h-screen'>
      <h2 className='text-3xl font-bold'>{error.message}</h2>
      <button
        className='btn btn-warning'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Coba Lagi
      </button>
    </div>
  );
}
