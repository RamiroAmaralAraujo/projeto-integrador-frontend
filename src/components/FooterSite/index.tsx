import { ContentFooter } from './components/ContentFooter';
import { HeaderFooter } from './components/Header';

export function FooterSite() {
  return (
    <div className="pt-12 pb-6 bg-brand-blue-200">
      <HeaderFooter/>
      <ContentFooter/>
    </div>
  );
}
