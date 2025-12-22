import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LogOut,
  Plus,
  Trash2,
  Save,
  Newspaper,
  Calendar,
  Music,
  Disc,
  Camera,
  Video,
  FileImage,
  FileText,
  Home,
} from "lucide-react";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("press");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-gothic text-xl font-bold text-gradient-blood">
              ADMIN
            </h1>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Home className="w-3 h-3" />
              Ver site
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden md:block">
              {user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {!isAdmin && (
          <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-destructive">
              Você não tem permissões de administrador. Entre em contato com o suporte.
            </p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-1 mb-6 h-auto">
            <TabsTrigger value="press" className="text-xs py-2">
              <Newspaper className="w-3 h-3 mr-1" />
              Matérias
            </TabsTrigger>
            <TabsTrigger value="events" className="text-xs py-2">
              <Calendar className="w-3 h-3 mr-1" />
              Agenda
            </TabsTrigger>
            <TabsTrigger value="presaves" className="text-xs py-2">
              <Music className="w-3 h-3 mr-1" />
              Pre-Save
            </TabsTrigger>
            <TabsTrigger value="releases" className="text-xs py-2">
              <Disc className="w-3 h-3 mr-1" />
              Lançamentos
            </TabsTrigger>
            <TabsTrigger value="photos" className="text-xs py-2">
              <Camera className="w-3 h-3 mr-1" />
              Fotos
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-xs py-2">
              <Video className="w-3 h-3 mr-1" />
              Vídeos
            </TabsTrigger>
            <TabsTrigger value="logos" className="text-xs py-2">
              <FileImage className="w-3 h-3 mr-1" />
              Logos
            </TabsTrigger>
            <TabsTrigger value="rider" className="text-xs py-2">
              <FileText className="w-3 h-3 mr-1" />
              Rider
            </TabsTrigger>
          </TabsList>

          <TabsContent value="press">
            <PressManager isAdmin={isAdmin} />
          </TabsContent>
          <TabsContent value="events">
            <EventsManager isAdmin={isAdmin} />
          </TabsContent>
          <TabsContent value="presaves">
            <PresavesManager isAdmin={isAdmin} />
          </TabsContent>
          <TabsContent value="releases">
            <ReleasesManager isAdmin={isAdmin} />
          </TabsContent>
          <TabsContent value="photos">
            <MediaManager category="fotos" isAdmin={isAdmin} />
          </TabsContent>
          <TabsContent value="videos">
            <MediaManager category="videos" isAdmin={isAdmin} />
          </TabsContent>
          <TabsContent value="logos">
            <MediaManager category="logos" isAdmin={isAdmin} />
          </TabsContent>
          <TabsContent value="rider">
            <MediaManager category="rider" isAdmin={isAdmin} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Press Manager Component
const PressManager = ({ isAdmin }: { isAdmin: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", source: "", link: "", image_url: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("press_articles").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  const handleAdd = async () => {
    if (!isAdmin) return toast.error("Sem permissão");
    if (!form.title || !form.source || !form.link) return toast.error("Preencha os campos obrigatórios");

    const { error } = await supabase.from("press_articles").insert(form);
    if (error) return toast.error("Erro ao adicionar");
    
    toast.success("Matéria adicionada!");
    setForm({ title: "", source: "", link: "", image_url: "" });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return toast.error("Sem permissão");
    const { error } = await supabase.from("press_articles").delete().eq("id", id);
    if (error) return toast.error("Erro ao excluir");
    
    toast.success("Excluído!");
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4">Adicionar Matéria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Título *</Label>
            <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
          </div>
          <div>
            <Label>Fonte *</Label>
            <Input value={form.source} onChange={(e) => setForm({...form, source: e.target.value})} placeholder="Ex: G1, UOL" />
          </div>
          <div>
            <Label>Link *</Label>
            <Input value={form.link} onChange={(e) => setForm({...form, link: e.target.value})} />
          </div>
          <div>
            <Label>URL da Imagem</Label>
            <Input value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} />
          </div>
        </div>
        <Button variant="blood" className="mt-4" onClick={handleAdd} disabled={!isAdmin}>
          <Plus className="w-4 h-4 mr-2" /> Adicionar
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.source}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} disabled={!isAdmin}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Events Manager Component
const EventsManager = ({ isAdmin }: { isAdmin: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", venue: "", city: "", event_date: "", event_time: "", ticket_link: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
    if (data) setItems(data);
  };

  const handleAdd = async () => {
    if (!isAdmin) return toast.error("Sem permissão");
    if (!form.title || !form.venue || !form.city || !form.event_date) return toast.error("Preencha os campos obrigatórios");

    const { error } = await supabase.from("events").insert(form);
    if (error) return toast.error("Erro ao adicionar");
    
    toast.success("Evento adicionado!");
    setForm({ title: "", venue: "", city: "", event_date: "", event_time: "", ticket_link: "" });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return toast.error("Sem permissão");
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) return toast.error("Erro ao excluir");
    
    toast.success("Excluído!");
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4">Adicionar Evento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>Título *</Label>
            <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
          </div>
          <div>
            <Label>Local *</Label>
            <Input value={form.venue} onChange={(e) => setForm({...form, venue: e.target.value})} />
          </div>
          <div>
            <Label>Cidade *</Label>
            <Input value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} />
          </div>
          <div>
            <Label>Data *</Label>
            <Input type="date" value={form.event_date} onChange={(e) => setForm({...form, event_date: e.target.value})} />
          </div>
          <div>
            <Label>Horário</Label>
            <Input type="time" value={form.event_time} onChange={(e) => setForm({...form, event_time: e.target.value})} />
          </div>
          <div>
            <Label>Link Ingresso</Label>
            <Input value={form.ticket_link} onChange={(e) => setForm({...form, ticket_link: e.target.value})} />
          </div>
        </div>
        <Button variant="blood" className="mt-4" onClick={handleAdd} disabled={!isAdmin}>
          <Plus className="w-4 h-4 mr-2" /> Adicionar
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.venue} - {item.city} ({item.event_date})</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} disabled={!isAdmin}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Presaves Manager Component
const PresavesManager = ({ isAdmin }: { isAdmin: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", description: "", cover_url: "", presave_link: "", release_date: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("presaves").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  const handleAdd = async () => {
    if (!isAdmin) return toast.error("Sem permissão");
    if (!form.title || !form.presave_link) return toast.error("Preencha os campos obrigatórios");

    const { error } = await supabase.from("presaves").insert(form);
    if (error) return toast.error("Erro ao adicionar");
    
    toast.success("Pre-save adicionado!");
    setForm({ title: "", description: "", cover_url: "", presave_link: "", release_date: "" });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return toast.error("Sem permissão");
    const { error } = await supabase.from("presaves").delete().eq("id", id);
    if (error) return toast.error("Erro ao excluir");
    
    toast.success("Excluído!");
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4">Adicionar Pre-Save</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Título *</Label>
            <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
          </div>
          <div>
            <Label>Link Pre-Save *</Label>
            <Input value={form.presave_link} onChange={(e) => setForm({...form, presave_link: e.target.value})} />
          </div>
          <div>
            <Label>URL da Capa</Label>
            <Input value={form.cover_url} onChange={(e) => setForm({...form, cover_url: e.target.value})} />
          </div>
          <div>
            <Label>Data de Lançamento</Label>
            <Input type="date" value={form.release_date} onChange={(e) => setForm({...form, release_date: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <Label>Descrição</Label>
            <Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
          </div>
        </div>
        <Button variant="blood" className="mt-4" onClick={handleAdd} disabled={!isAdmin}>
          <Plus className="w-4 h-4 mr-2" /> Adicionar
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.title}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} disabled={!isAdmin}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Releases Manager Component
const ReleasesManager = ({ isAdmin }: { isAdmin: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", cover_url: "", spotify_link: "", youtube_link: "", release_date: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("releases").select("*").order("release_date", { ascending: false });
    if (data) setItems(data);
  };

  const handleAdd = async () => {
    if (!isAdmin) return toast.error("Sem permissão");
    if (!form.title) return toast.error("Preencha o título");

    const { error } = await supabase.from("releases").insert(form);
    if (error) return toast.error("Erro ao adicionar");
    
    toast.success("Lançamento adicionado!");
    setForm({ title: "", cover_url: "", spotify_link: "", youtube_link: "", release_date: "" });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return toast.error("Sem permissão");
    const { error } = await supabase.from("releases").delete().eq("id", id);
    if (error) return toast.error("Erro ao excluir");
    
    toast.success("Excluído!");
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4">Adicionar Lançamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Título *</Label>
            <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
          </div>
          <div>
            <Label>Data Lançamento</Label>
            <Input type="date" value={form.release_date} onChange={(e) => setForm({...form, release_date: e.target.value})} />
          </div>
          <div>
            <Label>URL da Capa</Label>
            <Input value={form.cover_url} onChange={(e) => setForm({...form, cover_url: e.target.value})} />
          </div>
          <div>
            <Label>Link Spotify</Label>
            <Input value={form.spotify_link} onChange={(e) => setForm({...form, spotify_link: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <Label>Link YouTube</Label>
            <Input value={form.youtube_link} onChange={(e) => setForm({...form, youtube_link: e.target.value})} />
          </div>
        </div>
        <Button variant="blood" className="mt-4" onClick={handleAdd} disabled={!isAdmin}>
          <Plus className="w-4 h-4 mr-2" /> Adicionar
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.title}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} disabled={!isAdmin}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Media Manager Component
const MediaManager = ({ category, isAdmin }: { category: string; isAdmin: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", url: "", thumbnail_url: "", drive_link: "" });

  useEffect(() => {
    fetchItems();
  }, [category]);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("media_items")
      .select("*")
      .eq("category", category)
      .order("display_order", { ascending: true });
    if (data) setItems(data);
  };

  const handleAdd = async () => {
    if (!isAdmin) return toast.error("Sem permissão");
    if (!form.title || !form.url) return toast.error("Preencha os campos obrigatórios");

    const { error } = await supabase.from("media_items").insert({ ...form, category });
    if (error) return toast.error("Erro ao adicionar");
    
    toast.success("Item adicionado!");
    setForm({ title: "", url: "", thumbnail_url: "", drive_link: "" });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return toast.error("Sem permissão");
    const { error } = await supabase.from("media_items").delete().eq("id", id);
    if (error) return toast.error("Erro ao excluir");
    
    toast.success("Excluído!");
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4">Adicionar {category.charAt(0).toUpperCase() + category.slice(1)}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Título *</Label>
            <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
          </div>
          <div>
            <Label>URL {category === "videos" ? "YouTube" : "do arquivo"} *</Label>
            <Input value={form.url} onChange={(e) => setForm({...form, url: e.target.value})} />
          </div>
          <div>
            <Label>URL Thumbnail</Label>
            <Input value={form.thumbnail_url} onChange={(e) => setForm({...form, thumbnail_url: e.target.value})} />
          </div>
          <div>
            <Label>Link Google Drive</Label>
            <Input value={form.drive_link} onChange={(e) => setForm({...form, drive_link: e.target.value})} />
          </div>
        </div>
        <Button variant="blood" className="mt-4" onClick={handleAdd} disabled={!isAdmin}>
          <Plus className="w-4 h-4 mr-2" /> Adicionar
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground truncate">{item.url}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} disabled={!isAdmin}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
