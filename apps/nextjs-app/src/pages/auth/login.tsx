import { HttpBadRequest } from '@httpx/exception';
import { useState, useEffect } from 'react';
import { getServerTranslations } from '@/backend/i18n/getServerTranslations';
import { authConfig } from '@/features/auth/auth.config';
import { LoginPage } from '@/features/auth/pages/LoginPage';

type Props = {
  /** Add props here */
};

export default function LoginRoute() {
  const [data, setData] = useState<Props | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const locale = 'en'; // Replace with the actual locale value
      if (locale === undefined) {
        throw new HttpBadRequest('locale is missing');
      }
      const { i18nNamespaces } = authConfig;

      try {
        const response = await fetch('/api/login', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setData({
          ...(await getServerTranslations(locale, i18nNamespaces)),
          ...data,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return data ? <LoginPage {...data} /> : null;
}