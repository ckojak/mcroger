import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, token } = await req.json()
    
    // Verificar token de setup
    const setupToken = Deno.env.get('ADMIN_SETUP_TOKEN')
    if (!setupToken || token !== setupToken) {
      return new Response(
        JSON.stringify({ error: 'Token inválido' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Buscar usuário pelo email
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    
    if (authError) {
      console.error('Error listing users:', authError)
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar usuários' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const user = authUsers.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Usuário não encontrado. Certifique-se de que já criou uma conta.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Inserir ou atualizar role para admin
    const { error: insertError } = await supabase
      .from('user_roles')
      .upsert(
        { user_id: user.id, role: 'admin' },
        { onConflict: 'user_id,role' }
      )

    if (insertError) {
      console.error('Error inserting role:', insertError)
      return new Response(
        JSON.stringify({ error: 'Erro ao atribuir permissão' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Admin role assigned to user: ${email} (${user.id})`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Usuário ${email} agora é administrador!`,
        user_id: user.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Setup admin error:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
