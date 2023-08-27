import { useEffect, useState } from 'react';

type Props = {
  hasRunOnServer: boolean;
};

export default function MonitorSentrySsrRoute() {
  const [hasRunOnServer, setHasRunOnServer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data', { cache: 'force-cache' });
        const data = await response.json();
        // Process the data
        setHasRunOnServer(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Unexpected error</h1>
      <p>
        If you see this message, it means that an error occurred while fetching
        the data. This is a bug in the application and may affect the ability to
        display error pages and log errors on Sentry. See the monitoring page in
        /pages/_monitor/sentry/ssr-page.tsx.
      </p>
    </div>
  );
}