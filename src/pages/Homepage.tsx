import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProjectModal } from '../components/ProjectModal';
import { Hero } from '../components/home/Hero';
import { TrustBand } from '../components/home/TrustBand';
import { Approach } from '../components/home/Approach';
import { Cases } from '../components/home/Cases';
import { HowWeWork } from '../components/home/HowWeWork';
import { ResearchPlanner } from '../components/home/ResearchPlanner';
import { ContactCTA } from '../components/home/ContactCTA';

export default function Homepage() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStartProject = () => {
    setIsProjectModalOpen(true);
  };

  const handleServiceSelect = (serviceName: string) => {
    setSelectedServiceFilter(serviceName);
    const plannerSection = document.getElementById('planner');
    if (plannerSection) {
      plannerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[var(--background)]">
      <Header
        onStartProject={handleStartProject}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main id="top" className="flex flex-col">
        <Hero onStartProject={handleStartProject} />
        <Approach onServiceSelect={handleServiceSelect} />
        <TrustBand />
        <Cases />
        <HowWeWork />
        <ResearchPlanner
          initialService={selectedServiceFilter}
          onStartProject={handleStartProject}
        />
        <ContactCTA onStartProject={handleStartProject} />
      </main>

      <Footer />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}
