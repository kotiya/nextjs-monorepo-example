import { HttpBadRequest } from '@httpx/exception';
import type { InferGetServerSidePropsType } from 'next';
import { getServerTranslations } from '@/backend/i18n/getServerTranslations';
import { homeConfig } from '@/features/home/home.config';
import { HomePage } from '@/features/home/pages';

type Props = {
  /** Add HomeRoute props here */
};

export default function HomeRoute(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <HomePage />;
}

export async function getStaticProps() {
  const locale = 'en'; // replace with the actual locale
  const { i18nNamespaces } = homeConfig;
  const data = await fetch('https://api.example.com/static-data', {
    cache: 'force-cache',
  }).then((response) => response.json());

  return {
    props: {
      ...(await getServerTranslations(locale, i18nNamespaces)),
      data,
    },
    revalidate: 10,
  };
}

export async function getServerSideProps(context) {
  const locale = 'en'; // replace with the actual locale
  const { i18nNamespaces } = homeConfig;
  const dynamicData = await fetch('https://api.example.com/dynamic-data', {
    cache: 'no-store',
  }).then((response) => response.json());

  return {
    props: {
      ...(await getServerTranslations(locale, i18nNamespaces)),
      dynamicData,
    },
  };
}