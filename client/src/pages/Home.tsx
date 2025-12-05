import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, FileText, Layers } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview do Desafio</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Apresentação técnica das análises de dados para o case Méliuz, focando em insights de vendas, comportamento do consumidor e performance regional.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="soft-card border-none bg-white/50 hover:bg-white/80 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Análises</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Questões</div>
              <p className="text-xs text-muted-foreground">Respondidas com SQL e dados</p>
            </CardContent>
          </Card>
          
          <Card className="soft-card border-none bg-white/50 hover:bg-white/80 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Banco de Dados</CardTitle>
              <Database className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">PostgreSQL</div>
              <p className="text-xs text-muted-foreground">Estrutura relacional otimizada</p>
            </CardContent>
          </Card>

          <Card className="soft-card border-none bg-white/50 hover:bg-white/80 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tratamento</CardTitle>
              <Layers className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Normalizado</div>
              <p className="text-xs text-muted-foreground">Correção de grafias e duplicatas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="soft-card col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Modelo de Dados (ER)</CardTitle>
              <CardDescription>Relacionamento entre as tabelas do sistema</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-6 bg-white rounded-b-2xl">
              <img 
                src="/images/diagrama-er.png" 
                alt="Diagrama Entidade Relacionamento" 
                className="max-w-full h-auto rounded-lg shadow-sm border"
              />
            </CardContent>
          </Card>

          <Card className="soft-card col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Observações de Tratamento</CardTitle>
              <CardDescription>Melhorias realizadas na base original</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Padronização de Cidades</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Correção de duplicidade de grafia (ex: "Maranhao" vs "Maranhão"). Unificação para garantir integridade nos relatórios regionais.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Padronização de Categorias</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Normalização de termos (ex: "Eletronicos" vs "Eletrônicos") via comandos UPDATE, assegurando precisão na análise de risco e vendas por categoria.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t flex items-center gap-2">
                <img src="/images/postgresql-logo.png" alt="PostgreSQL" className="h-8 w-auto" />
                <span className="text-sm font-medium text-muted-foreground">Powered by PostgreSQL</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
