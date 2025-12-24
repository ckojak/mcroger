import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Edit,
  Eye,
  EyeOff,
  ExternalLink,
  RefreshCw,
  X,
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
            {isAdmin && (
              <span className="text-xs bg-blood/20 text-blood-light px-2 py-1 rounded">
                Admin
              </span>
            )}
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
              Você não tem permissões de administrador. Vá para /auth e use a aba "Configurar" para se tornar admin.
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("press_articles").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching:", error);
      toast.error("Erro ao carregar dados");
    }
    if (data) setItems(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = useCallback(async () => {
    if (!isAdmin) return toast.error("Sem permissão de administrador");
    if (!form.title || !form.source || !form.link) return toast.error("Preencha os campos obrigatórios");

    setIsLoading(true);
    if (editingId) {
      const { error } = await supabase.from("press_articles").update(form).eq("id", editingId);
      if (error) {
        console.error("Update error:", error);
        toast.error("Erro ao atualizar: " + error.message);
      } else {
        toast.success("Matéria atualizada!");
        setEditingId(null);
      }
    } else {
      const { error } = await supabase.from("press_articles").insert(form);
      if (error) {
        console.error("Insert error:", error);
        toast.error("Erro ao adicionar: " + error.message);
      } else {
        toast.success("Matéria adicionada!");
      }
    }
    
    setForm({ title: "", source: "", link: "", image_url: "" });
    fetchItems();
    setIsLoading(false);
  }, [isAdmin, form, editingId, fetchItems]);

  const handleEdit = (item: any) => {
    setForm({ title: item.title, source: item.source, link: item.link, image_url: item.image_url || "" });
    setEditingId(item.id);
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    if (!isAdmin) return toast.error("Sem permissão");
    const { error } = await supabase.from("press_articles").update({ is_active: !currentState }).eq("id", id);
    if (error) {
      toast.error("Erro ao alterar status");
    } else {
      fetchItems();
    }
  };

  const handleDelete = useCallback(async (id: string) => {
    if (!isAdmin) return toast.error("Sem permissão");
    if (!confirm("Tem certeza que deseja excluir?")) return;
    
    const { error } = await supabase.from("press_articles").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir: " + error.message);
    } else {
      toast.success("Excluído!");
      fetchItems();
    }
  }, [isAdmin, fetchItems]);

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", source: "", link: "", image_url: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-gothic text-lg font-bold">Matérias na Mídia</h2>
        <Button variant="ghost" size="sm" onClick={fetchItems} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4 flex items-center gap-2">
          {editingId ? <><Edit className="w-4 h-4" /> Editar Matéria</> : <><Plus className="w-4 h-4" /> Adicionar Matéria</>}
        </h3>
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
        <div className="flex gap-2 mt-4">
          <Button variant="blood" onClick={handleSave} disabled={!isAdmin || isLoading}>
            <Save className="w-4 h-4 mr-2" /> {editingId ? "Salvar" : "Adicionar"}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={cancelEdit}>
              <X className="w-4 h-4 mr-2" /> Cancelar
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">{items.length} itens cadastrados</p>
        {items.map((item) => (
          <div key={item.id} className={`bg-card border rounded-lg p-3 flex items-center justify-between gap-4 ${!item.is_active ? 'opacity-50 border-border/30' : 'border-border'}`}>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.source}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleToggleActive(item.id, item.is_active)} title={item.is_active ? "Desativar" : "Ativar"}>
                {item.is_active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} disabled={!isAdmin}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} disabled={!isAdmin}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </a>
              )}
            </div>
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
    if (data) setItems(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = useCallback(async () => {
    if (!isAdmin) return toast.error("Sem permissão de administrador");
    if (!form.title || !form.venue || !form.city || !form.event_date) return toast.error("Preencha os campos obrigatórios");

    setIsLoading(true);
    if (editingId) {
      const { error } = await supabase.from("events").update(form).eq("id", editingId);
      if (error) toast.error("Erro ao atualizar: " + error.message);
      else { toast.success("Evento atualizado!"); setEditingId(null); }
    } else {
      const { error } = await supabase.from("events").insert(form);
      if (error) toast.error("Erro ao adicionar: " + error.message);
      else toast.success("Evento adicionado!");
    }
    
    setForm({ title: "", venue: "", city: "", event_date: "", event_time: "", ticket_link: "" });
    fetchItems();
    setIsLoading(false);
  }, [isAdmin, form, editingId, fetchItems]);

  const handleEdit = (item: any) => {
    setForm({ 
      title: item.title, 
      venue: item.venue, 
      city: item.city, 
      event_date: item.event_date || "", 
      event_time: item.event_time || "", 
      ticket_link: item.ticket_link || "" 
    });
    setEditingId(item.id);
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    if (!isAdmin) return toast.error("Sem permissão");
    const { error } = await supabase.from("events").update({ is_active: !currentState }).eq("id", id);
    if (!error) fetchItems();
  };

  const handleDelete = useCallback(async (id: string) => {
    if (!isAdmin) return toast.error("Sem permissão");
    if (!confirm("Tem certeza que deseja excluir?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) { toast.success("Excluído!"); fetchItems(); }
  }, [isAdmin, fetchItems]);

  const cancelEdit = () => { setEditingId(null); setForm({ title: "", venue: "", city: "", event_date: "", event_time: "", ticket_link: "" }); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-gothic text-lg font-bold">Agenda de Shows</h2>
        <Button variant="ghost" size="sm" onClick={fetchItems} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4 flex items-center gap-2">
          {editingId ? <><Edit className="w-4 h-4" /> Editar Evento</> : <><Plus className="w-4 h-4" /> Adicionar Evento</>}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div><Label>Título *</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
          <div><Label>Local *</Label><Input value={form.venue} onChange={(e) => setForm({...form, venue: e.target.value})} /></div>
          <div><Label>Cidade *</Label><Input value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} /></div>
          <div><Label>Data *</Label><Input type="date" value={form.event_date} onChange={(e) => setForm({...form, event_date: e.target.value})} /></div>
          <div><Label>Horário</Label><Input type="time" value={form.event_time} onChange={(e) => setForm({...form, event_time: e.target.value})} /></div>
          <div><Label>Link Ingresso</Label><Input value={form.ticket_link} onChange={(e) => setForm({...form, ticket_link: e.target.value})} /></div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="blood" onClick={handleSave} disabled={!isAdmin || isLoading}><Save className="w-4 h-4 mr-2" /> {editingId ? "Salvar" : "Adicionar"}</Button>
          {editingId && <Button variant="outline" onClick={cancelEdit}><X className="w-4 h-4 mr-2" /> Cancelar</Button>}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">{items.length} eventos</p>
        {items.map((item) => (
          <div key={item.id} className={`bg-card border rounded-lg p-3 flex items-center justify-between gap-4 ${!item.is_active ? 'opacity-50 border-border/30' : 'border-border'}`}>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.venue} - {item.city} ({item.event_date})</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleToggleActive(item.id, item.is_active)}>
                {item.is_active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} disabled={!isAdmin}><Edit className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} disabled={!isAdmin}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase.from("presaves").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
    setIsLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = useCallback(async () => {
    if (!isAdmin) return toast.error("Sem permissão de administrador");
    if (!form.title || !form.presave_link) return toast.error("Preencha os campos obrigatórios");

    setIsLoading(true);
    if (editingId) {
      const { error } = await supabase.from("presaves").update(form).eq("id", editingId);
      if (error) toast.error("Erro: " + error.message);
      else { toast.success("Atualizado!"); setEditingId(null); }
    } else {
      const { error } = await supabase.from("presaves").insert(form);
      if (error) toast.error("Erro: " + error.message);
      else toast.success("Adicionado!");
    }
    setForm({ title: "", description: "", cover_url: "", presave_link: "", release_date: "" });
    fetchItems();
    setIsLoading(false);
  }, [isAdmin, form, editingId, fetchItems]);

  const handleEdit = (item: any) => {
    setForm({ title: item.title, description: item.description || "", cover_url: item.cover_url || "", presave_link: item.presave_link, release_date: item.release_date || "" });
    setEditingId(item.id);
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    if (!isAdmin) return;
    await supabase.from("presaves").update({ is_active: !currentState }).eq("id", id);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin || !confirm("Excluir?")) return;
    await supabase.from("presaves").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-gothic text-lg font-bold">Pre-Saves</h2>
        <Button variant="ghost" size="sm" onClick={fetchItems}><RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /></Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4">{editingId ? "Editar" : "Adicionar"} Pre-Save</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Título *</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
          <div><Label>Link Pre-Save *</Label><Input value={form.presave_link} onChange={(e) => setForm({...form, presave_link: e.target.value})} /></div>
          <div><Label>URL da Capa</Label><Input value={form.cover_url} onChange={(e) => setForm({...form, cover_url: e.target.value})} /></div>
          <div><Label>Data de Lançamento</Label><Input type="date" value={form.release_date} onChange={(e) => setForm({...form, release_date: e.target.value})} /></div>
          <div className="md:col-span-2"><Label>Descrição</Label><Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="blood" onClick={handleSave} disabled={!isAdmin}><Save className="w-4 h-4 mr-2" /> {editingId ? "Salvar" : "Adicionar"}</Button>
          {editingId && <Button variant="outline" onClick={() => { setEditingId(null); setForm({ title: "", description: "", cover_url: "", presave_link: "", release_date: "" }); }}><X className="w-4 h-4" /></Button>}
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`bg-card border rounded-lg p-3 flex items-center gap-4 ${!item.is_active ? 'opacity-50' : ''}`}>
            {item.cover_url && <img src={item.cover_url} alt="" className="w-12 h-12 rounded object-cover" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.release_date}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleToggleActive(item.id, item.is_active)}>{item.is_active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4" />}</Button>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}><Edit className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase.from("releases").select("*").order("release_date", { ascending: false });
    if (data) setItems(data);
    setIsLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = useCallback(async () => {
    if (!isAdmin) return toast.error("Sem permissão");
    if (!form.title) return toast.error("Preencha o título");

    if (editingId) {
      const { error } = await supabase.from("releases").update(form).eq("id", editingId);
      if (!error) { toast.success("Atualizado!"); setEditingId(null); }
    } else {
      const { error } = await supabase.from("releases").insert(form);
      if (!error) toast.success("Adicionado!");
    }
    setForm({ title: "", cover_url: "", spotify_link: "", youtube_link: "", release_date: "" });
    fetchItems();
  }, [isAdmin, form, editingId, fetchItems]);

  const handleEdit = (item: any) => {
    setForm({ title: item.title, cover_url: item.cover_url || "", spotify_link: item.spotify_link || "", youtube_link: item.youtube_link || "", release_date: item.release_date || "" });
    setEditingId(item.id);
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    if (!isAdmin) return;
    await supabase.from("releases").update({ is_active: !currentState }).eq("id", id);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin || !confirm("Excluir?")) return;
    await supabase.from("releases").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-gothic text-lg font-bold">Lançamentos</h2>
        <Button variant="ghost" size="sm" onClick={fetchItems}><RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /></Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4">{editingId ? "Editar" : "Adicionar"} Lançamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Título *</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
          <div><Label>Data Lançamento</Label><Input type="date" value={form.release_date} onChange={(e) => setForm({...form, release_date: e.target.value})} /></div>
          <div><Label>URL da Capa</Label><Input value={form.cover_url} onChange={(e) => setForm({...form, cover_url: e.target.value})} /></div>
          <div><Label>Link Spotify</Label><Input value={form.spotify_link} onChange={(e) => setForm({...form, spotify_link: e.target.value})} /></div>
          <div className="md:col-span-2"><Label>Link YouTube</Label><Input value={form.youtube_link} onChange={(e) => setForm({...form, youtube_link: e.target.value})} /></div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="blood" onClick={handleSave} disabled={!isAdmin}><Save className="w-4 h-4 mr-2" /> {editingId ? "Salvar" : "Adicionar"}</Button>
          {editingId && <Button variant="outline" onClick={() => { setEditingId(null); setForm({ title: "", cover_url: "", spotify_link: "", youtube_link: "", release_date: "" }); }}><X className="w-4 h-4" /></Button>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className={`bg-card border rounded-lg overflow-hidden ${!item.is_active ? 'opacity-50' : ''}`}>
            {item.cover_url && <img src={item.cover_url} alt="" className="w-full h-32 object-cover" />}
            <div className="p-3">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.release_date}</p>
              <div className="flex gap-2 mt-2">
                <Button variant="ghost" size="sm" onClick={() => handleToggleActive(item.id, item.is_active)}>{item.is_active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4" />}</Button>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Media Manager Component with preview
const MediaManager = ({ category, isAdmin }: { category: string; isAdmin: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", url: "", thumbnail_url: "", drive_link: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewItem, setPreviewItem] = useState<any>(null);

  const categoryLabels: Record<string, string> = {
    fotos: "Fotos",
    videos: "Vídeos", 
    logos: "Logos",
    rider: "Rider Técnico"
  };

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("media_items")
      .select("*")
      .eq("category", category)
      .order("display_order", { ascending: true });
    if (data) setItems(data);
    setIsLoading(false);
  }, [category]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = useCallback(async () => {
    if (!isAdmin) return toast.error("Sem permissão de administrador");
    if (!form.title || !form.url) return toast.error("Preencha título e URL");

    if (editingId) {
      const { error } = await supabase.from("media_items").update(form).eq("id", editingId);
      if (error) toast.error("Erro: " + error.message);
      else { toast.success("Atualizado!"); setEditingId(null); }
    } else {
      const { error } = await supabase.from("media_items").insert({ ...form, category });
      if (error) toast.error("Erro: " + error.message);
      else toast.success("Adicionado!");
    }
    setForm({ title: "", url: "", thumbnail_url: "", drive_link: "" });
    fetchItems();
  }, [isAdmin, form, editingId, category, fetchItems]);

  const handleEdit = (item: any) => {
    setForm({ title: item.title, url: item.url, thumbnail_url: item.thumbnail_url || "", drive_link: item.drive_link || "" });
    setEditingId(item.id);
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    if (!isAdmin) return;
    await supabase.from("media_items").update({ is_active: !currentState }).eq("id", id);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin || !confirm("Excluir este item?")) return;
    await supabase.from("media_items").delete().eq("id", id);
    toast.success("Excluído!");
    fetchItems();
  };

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-gothic text-lg font-bold">{categoryLabels[category]}</h2>
        <Button variant="ghost" size="sm" onClick={fetchItems}><RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /></Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-gothic font-bold mb-4">{editingId ? "Editar" : "Adicionar"} {categoryLabels[category]}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Título *</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Nome descritivo" /></div>
          <div><Label>URL {category === "videos" ? "YouTube" : "do arquivo"} *</Label><Input value={form.url} onChange={(e) => setForm({...form, url: e.target.value})} placeholder={category === "videos" ? "https://youtube.com/..." : "https://..."} /></div>
          <div><Label>URL Thumbnail (opcional)</Label><Input value={form.thumbnail_url} onChange={(e) => setForm({...form, thumbnail_url: e.target.value})} /></div>
          <div><Label>Link Google Drive (opcional)</Label><Input value={form.drive_link} onChange={(e) => setForm({...form, drive_link: e.target.value})} /></div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="blood" onClick={handleSave} disabled={!isAdmin}><Save className="w-4 h-4 mr-2" /> {editingId ? "Salvar" : "Adicionar"}</Button>
          {editingId && <Button variant="outline" onClick={() => { setEditingId(null); setForm({ title: "", url: "", thumbnail_url: "", drive_link: "" }); }}><X className="w-4 h-4" /></Button>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Nenhum item cadastrado. Adicione acima ou as mídias hardcoded no código aparecerão no site.
          </div>
        )}
        {items.map((item) => {
          const isVideo = category === "videos";
          const thumbnailUrl = item.thumbnail_url || (isVideo && item.url ? `https://img.youtube.com/vi/${getYouTubeId(item.url)}/mqdefault.jpg` : item.url);
          
          return (
            <div key={item.id} className={`bg-card border rounded-lg overflow-hidden ${!item.is_active ? 'opacity-50' : ''}`}>
              <div 
                className="relative aspect-video bg-muted cursor-pointer group"
                onClick={() => setPreviewItem(item)}
              >
                {(category === "fotos" || category === "logos" || isVideo) && thumbnailUrl && (
                  <img 
                    src={thumbnailUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                {category === "rider" && (
                  <div className="flex items-center justify-center h-full">
                    <FileText className="w-12 h-12 text-blood-light" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  <Button variant="ghost" size="sm" onClick={() => handleToggleActive(item.id, item.is_active)}>
                    {item.is_active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm"><ExternalLink className="w-4 h-4" /></Button>
                    </a>
                  )}
                  {item.drive_link && (
                    <a href={item.drive_link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" title="Google Drive"><FileImage className="w-4 h-4 text-blue-400" /></Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewItem?.title}</DialogTitle>
          </DialogHeader>
          {previewItem && (
            <div className="mt-4">
              {category === "videos" ? (
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeId(previewItem.url)}`}
                    title={previewItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              ) : category === "rider" ? (
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-blood-light mx-auto mb-4" />
                  <a href={previewItem.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="blood">Abrir Documento</Button>
                  </a>
                </div>
              ) : (
                <img src={previewItem.url} alt={previewItem.title} className="w-full max-h-[70vh] object-contain rounded-lg" />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
