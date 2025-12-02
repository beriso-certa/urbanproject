import WorkGrid from '../components/WorkGrid';
import client from '@/sanity/lib/client';
import { WORK_QUERY } from '@/sanity/lib/queries';

async function getWorks() {
  const works = await client.fetch(WORK_QUERY);
  return works || [];
}

export default async function WorkPage() {
  const works = await getWorks();
  
  return (
    <main className="min-h-screen bg-brand-dark text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Work</h1>
        <WorkGrid works={works} />
      </div>
    </main>
  );
}