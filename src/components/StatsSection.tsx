import { useEffect, useState, useRef } from "react";
import { Headphones, Instagram, Youtube, Music2 } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatItem = ({ icon, value, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Extract numeric value
  const numericValue = parseInt(value.replace(/[^\d]/g, ""));
  const prefix = value.match(/^\D+/)?.[0] || "";
  const suffix = value.match(/\D+$/)?.[0] || "";
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = numericValue / steps;
    let current = 0;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isVisible, numericValue, delay]);
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(num >= 10000000 ? 0 : 1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 100000 ? 0 : 0) + "K";
    }
    return num.toString();
  };

  return (
    <div 
      ref={ref}
      className="group relative p-8 bg-card rounded-2xl border border-border/50 hover:border-blood-light/50 transition-all duration-500 hover:shadow-blood hover:-translate-y-2"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blood/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blood/20 border border-blood-light/30 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <div className="text-4xl md:text-5xl font-gothic font-bold text-foreground mb-2 animate-counter">
          {prefix}{isVisible ? formatNumber(count) : "0"}{suffix}
        </div>
        
        <p className="text-muted-foreground font-body text-sm uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: <Headphones className="w-8 h-8 text-blood-light" />,
      value: "+3000000",
      label: "Ouvintes Mensais",
      delay: 0,
    },
    {
      icon: <Instagram className="w-8 h-8 text-blood-light" />,
      value: "+234000",
      label: "Seguidores Instagram",
      delay: 200,
    },
    {
      icon: <Youtube className="w-8 h-8 text-blood-light" />,
      value: "+213000",
      label: "Inscritos YouTube",
      delay: 400,
    },
    {
      icon: <Music2 className="w-8 h-8 text-blood-light" />,
      value: "+42000",
      label: "Seguidores TikTok",
      delay: 600,
    },
  ];

  return (
    <section id="numeros" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-darker" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blood-light/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blood-light/30 to-transparent" />
      
      {/* Red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blood/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-gothic text-4xl md:text-5xl font-bold mb-4 text-gradient-blood">
            IMPACTO NA INTERNET
          </h2>
          <div className="w-24 h-1 bg-gradient-blood mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
