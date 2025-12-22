import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye } from "lucide-react";

const VisitCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Registrar visita
    const registerVisit = async () => {
      await supabase.from("site_visits").insert({ page: "/" });
    };

    // Buscar contagem
    const fetchCount = async () => {
      const { data, error } = await supabase.rpc("get_visit_count");
      if (!error && data !== null) {
        setCount(data);
      }
    };

    registerVisit();
    fetchCount();
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Eye className="w-3 h-3" />
      <span>{count.toLocaleString("pt-BR")} visitas</span>
    </div>
  );
};

export default VisitCounter;
