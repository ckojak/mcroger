import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Event {
  id: string;
  title: string;
  venue: string;
  city: string;
  event_date: string;
  event_time: string | null;
  ticket_link: string | null;
}

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .gte("event_date", today)
      .order("event_date", { ascending: true })
      .limit(6);

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) {
    return (
      <section className="py-12 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Carregando...</div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <section id="agenda" className="py-12 relative">
      <div className="absolute inset-0 bg-surface-dark" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-gothic text-3xl md:text-4xl font-bold mb-2 text-gradient-blood">
            AGENDA
          </h2>
          <p className="text-muted-foreground font-body text-sm">
            Próximos shows e eventos
          </p>
          <div className="w-16 h-1 bg-gradient-blood mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-card rounded-lg border border-border/50 p-4 hover:border-blood-light/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blood/20 rounded-lg p-3 text-center min-w-[60px]">
                  <span className="block text-2xl font-bold text-blood-light">
                    {format(new Date(event.event_date), "dd", { locale: ptBR })}
                  </span>
                  <span className="block text-xs text-muted-foreground uppercase">
                    {format(new Date(event.event_date), "MMM", { locale: ptBR })}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-gothic font-bold text-sm truncate">{event.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{event.venue} - {event.city}</span>
                  </div>
                  {event.event_time && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      {event.event_time.slice(0, 5)}
                    </div>
                  )}
                  {event.ticket_link && (
                    <a
                      href={event.ticket_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blood-light hover:underline mt-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Comprar ingresso
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
