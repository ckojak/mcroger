import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, LogIn, UserPlus, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "setup">("login");
  const [setupToken, setSetupToken] = useState("");
  const [setupEmail, setSetupEmail] = useState("");
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Email ou senha incorretos");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Login realizado com sucesso!");
          navigate("/admin");
        }
      } else if (mode === "signup") {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Este email já está registrado");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Conta criada! Faça login para continuar.");
          setMode("login");
        }
      }
    } catch (error) {
      toast.error("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupToken || !setupEmail) {
      toast.error("Preencha todos os campos");
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('setup-admin', {
        body: { email: setupEmail, token: setupToken }
      });

      if (error) {
        toast.error(error.message || "Erro ao configurar admin");
      } else if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(data?.message || "Admin configurado com sucesso!");
        setSetupToken("");
        setSetupEmail("");
        setMode("login");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao configurar admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-gothic text-3xl font-bold text-gradient-blood mb-2">
            MC ROGER
          </h1>
          <p className="text-muted-foreground text-sm">
            Painel Administrativo
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-3 text-sm rounded-lg transition-colors ${
                mode === "login" 
                  ? "bg-blood text-white" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              Entrar
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 px-3 text-sm rounded-lg transition-colors ${
                mode === "signup" 
                  ? "bg-blood text-white" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Criar Conta
            </button>
            <button
              onClick={() => setMode("setup")}
              className={`py-2 px-3 text-sm rounded-lg transition-colors ${
                mode === "setup" 
                  ? "bg-blood text-white" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              title="Configurar Admin"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {mode === "setup" ? (
            <form onSubmit={handleSetupAdmin} className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
                <p className="text-xs text-amber-200">
                  Use esta opção para transformar um usuário já registrado em administrador.
                  Você precisa do token de configuração.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="setupEmail">Email do Usuário</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="setupEmail"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={setupEmail}
                    onChange={(e) => setSetupEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="setupToken">Token de Configuração</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="setupToken"
                    type="password"
                    placeholder="••••••••"
                    value={setupToken}
                    onChange={(e) => setSetupToken(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="blood"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Processando..." : "Tornar Admin"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="blood"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Carregando..." : mode === "login" ? "Entrar" : "Criar Conta"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-blood-light transition-colors"
            >
              ← Voltar ao site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
