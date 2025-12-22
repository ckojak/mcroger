import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import MediaSection from "@/components/MediaSection";
import SpotifySection from "@/components/SpotifySection";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import PressSection from "@/components/PressSection";
import EventsSection from "@/components/EventsSection";
import PresaveSection from "@/components/PresaveSection";
import ReleasesSection from "@/components/ReleasesSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <SpotifySection />
      <PressSection />
      <EventsSection />
      <PresaveSection />
      <ReleasesSection />
      <AboutSection />
      <StatsSection />
      <ContactSection />
      <MediaSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
