import LabSection from '../components/lab/LabSection';
import labData from '../lib/data/lab';

export default function LabPage() {
  return (
    <main className="lab-page mx-auto px-6 py-16">
      {labData.map((section) => (
        <LabSection
          key={section.category}
          title={section.category}
          projects={section.projects}
        />
      ))}
    </main>
  );
}
