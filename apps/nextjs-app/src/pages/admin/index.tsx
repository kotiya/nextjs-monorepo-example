import type { ReactElement } from 'react';
import { AdminLayout } from '@/features/admin/layouts';
import { AdminMainPage } from '@/features/admin/pages';

type Props = {
  /** Add props here */
};

AdminRoute.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default function AdminRoute() {
  return <AdminMainPage />;
}

export async function fetchStaticData() {
  const response = await fetch('/api/static-data', { cache: 'force-cache' });
  const data = await response.json();
  return data;
}

export async function fetchDynamicData() {
  const response = await fetch('/api/dynamic-data', { cache: 'no-store' });
  const data = await response.json();
  return data;
}

export async function fetchCachedData() {
  const response = await fetch('/api/cached-data', { cache: 'default' });
  const data = await response.json();
  return data;
}

export async function fetchRevalidatedData() {
  const response = await fetch('/api/revalidated-data', { cache: 'no-store' });
  const data = await response.json();
  return data;
}