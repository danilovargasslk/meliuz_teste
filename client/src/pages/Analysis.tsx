import { useRoute } from "wouter";
import Layout from "@/components/Layout";
import { analysisData } from "@/data/analysisData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Code2, Table as TableIcon, Lightbulb } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Analysis() {
  const [match, params] = useRoute("/analysis/:id");
  const analysisId = params?.id;
  const data = analysisData.find(item => item.id === analysisId);

  if (!data) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">Análise não encontrada</h2>
          <p className="text-muted-foreground mt-2">Selecione uma questão no menu lateral.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">
              Questão {data.title.split('.')[0]}
            </Badge>
            <span className="text-sm text-muted-foreground">Análise Técnica</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
            {data.title}
          </h1>
        </div>

        {/* Tabs for Sub-items */}
        <Tabs key={data.id} defaultValue={data.subItems[0].id} className="w-full">
          {data.subItems.length > 1 && (
            <TabsList className="mb-6 w-full justify-start overflow-x-auto bg-transparent p-0 gap-2">
              {data.subItems.map((subItem) => (
                <TabsTrigger 
                  key={subItem.id} 
                  value={subItem.id}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-full border border-transparent data-[state=active]:border-primary/20 px-4"
                >
                  {subItem.title}
                </TabsTrigger>
              ))}
            </TabsList>
          )}

          {data.subItems.map((subItem) => (
            <TabsContent key={subItem.id} value={subItem.id} className="space-y-8 mt-0">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground/90">{subItem.question}</h2>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column: Explanation & SQL */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Explanation Card */}
                  <Card className="soft-card border-l-4 border-l-primary overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-4">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Insights & Conclusão</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 text-base leading-relaxed text-foreground/90">
                      {subItem.explanation}
                    </CardContent>
                  </Card>

                  {/* SQL Query Section */}
                  <Card className="soft-card overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code2 className="h-5 w-5 text-muted-foreground" />
                          <CardTitle className="text-lg">Query SQL</CardTitle>
                        </div>
                        <Badge variant="secondary" className="font-mono text-xs">PostgreSQL</Badge>
                      </div>
                      <CardDescription>Código utilizado para extração dos dados</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 bg-[#fafafa]">
                      <ScrollArea className="h-[300px] w-full rounded-b-xl">
                        <SyntaxHighlighter 
                          language="sql" 
                          style={oneLight}
                          customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.875rem', background: 'transparent' }}
                          showLineNumbers={true}
                          wrapLines={true}
                        >
                          {subItem.sql}
                        </SyntaxHighlighter>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column: Data Output */}
                <div className="lg:col-span-1">
                  <Card className="soft-card h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <TableIcon className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">Data Output</CardTitle>
                      </div>
                      <CardDescription>Resultados da consulta</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                      <ScrollArea className="h-[600px] w-full">
                        <div className="p-4">
                          <div className="rounded-lg border overflow-hidden">
                            <table className="w-full text-sm text-left">
                              <thead className="bg-muted/50 text-muted-foreground font-medium">
                                <tr>
                                  {subItem.dataOutput.headers.map((header, i) => (
                                    <th key={i} className="px-4 py-3 border-b whitespace-nowrap">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {subItem.dataOutput.rows.map((row: (string | number)[], i: number) => (
                                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                                    {row.map((cell: string | number, j: number) => (
                                      <td key={j} className="px-4 py-3 whitespace-nowrap font-mono text-xs text-foreground/80">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
