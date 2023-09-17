import { PageTitle } from '@/components/elements/PageTitle';
import { LivesTable } from '@/components/parts/LivesTable';

export default function Lives() {
  return (
    <section className="p-4 pb-0">
      <PageTitle title="Lives" />
      <LivesTable className="mt-4" />
    </section>
  );
}
