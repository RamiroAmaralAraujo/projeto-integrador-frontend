import { Page } from '@/components/Page'
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';

export function Dashboard() {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Dashboard" />
        <SelectEmpresaButton />
      </Page.Header>
    </Page.Root>
  );
}