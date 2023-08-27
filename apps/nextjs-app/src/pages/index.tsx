import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { demoConfig } from '@/features/demo/demo.config';
import { DemoPage } from '@/features/demo/pages';

type Props = {
  /** Add HomeRoute props here */
};

export default function DemoRoute(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <DemoPage />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch('https://api.example.com/static-data', {
    cache: 'force-cache',
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};

export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/dynamic-data', {
    cache: 'no-store',
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}