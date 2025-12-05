export interface AnalysisSubItem {
  id: string;
  title: string;
  question: string;
  sql: string;
  dataOutput: {
    headers: string[];
    rows: (string | number)[][];
  };
  explanation: string;
}

export interface AnalysisItem {
  id: string;
  title: string;
  subItems: AnalysisSubItem[];
}

export const analysisData: AnalysisItem[] = [
  {
    id: "funcionalidade",
    title: "1. Escolha da Funcionalidade",
    subItems: [
      {
        id: "1.0",
        title: "Análise de Grupos",
        question: "Qual grupo você escolheria para ser a nossa funcionalidade? Por que?",
        sql: `SELECT 
    c.grupo,
    i.produto_id,
    i.preco_unitario::money ,
    SUM(i.quantidade) AS quantidade_total,
    SUM(i.subtotal)::money AS valor_total_vendido,
    COUNT(DISTINCT p.cliente_id) AS clientes_que_compraram
FROM itens_pedido as i
JOIN pedidos p ON p.pedido_id = i.pedido_id
JOIN clientes c ON c.cliente_id = p.cliente_id

where i.produto_id = 5906

GROUP BY c.grupo, i.produto_id, i.preco_unitario
ORDER BY i.preco_unitario DESC;`,
        dataOutput: {
          headers: ["grupo", "total_clientes", "total_pedidos", "valor_total_vendas", "valor_medio_pedido", "media_pedidos_por_cliente", "valor_medio_por_cliente", "percentual_clientes", "percentual_pedidos", "percentual_vendas"],
          rows: [
            ["B", 398, 3267, "$11,070,687.00", "$3,388.64", 8.21, "$27,815.80", 33.17, 32.67, 35.10],
            ["C", 389, 3293, "$10,358,584.00", "$3,145.64", 8.47, "$26,628.75", 32.42, 32.93, 32.84],
            ["A", 413, 3440, "$10,110,723.00", "$2,939.16", 8.33, "$24,481.17", 34.42, 34.40, 32.06]
          ]
        },
        explanation: "Com base nos dados, o **Grupo B** apresenta o maior valor total de vendas ($11M+) e o maior ticket médio ($3,388.64), apesar de ter o menor número de clientes totais. Isso indica um grupo com maior poder de compra ou engajamento financeiro, sendo o candidato ideal para testar novas funcionalidades premium ou que visem maximizar receita."
      }
    ]
  },
  {
    id: "geografia",
    title: "2. Influência do Estado",
    subItems: [
      {
        id: "2.0",
        title: "Vendas por Estado",
        question: "De acordo com suas análises, o estado do usuário influencia no valor das vendas?",
        sql: `SELECT
    c.estado,
    SUM(p.valor_total)::money AS valor_total_vendas,
    AVG(p.valor_total)::money AS valor_medio_pedido_por_estado,
    COUNT(DISTINCT p.pedido_id) AS total_pedidos,
    COUNT(DISTINCT c.cliente_id) AS total_clientes
FROM
    clientes c
JOIN
    pedidos p ON c.cliente_id = p.cliente_id
GROUP BY
    c.estado
ORDER BY
    valor_medio_pedido_por_estado DESC;`,
        dataOutput: {
          headers: ["estado", "valor_total_vendas", "valor_medio_pedido_por_estado", "total_pedidos", "total_clientes"],
          rows: [
            ["CE", "$1,005,333.00", "$3,351.11", 300, 38],
            ["AL", "$1,359,426.00", "$3,315.67", 410, 48],
            ["RN", "$920,391.00", "$3,287.11", 280, 36],
            ["AC", "$1,097,683.00", "$3,286.48", 334, 37],
            ["DF", "$1,194,352.00", "$3,272.20", 365, 47],
            ["PE", "$998,885.00", "$3,253.70", 307, 41],
            ["RO", "$1,046,045.00", "$3,228.53", 324, 36],
            ["TO", "$1,269,645.00", "$3,222.45", 394, 47],
            ["MA", "$1,384,391.00", "$3,212.04", 431, 50],
            ["AM", "$1,226,854.00", "$3,186.63", 385, 48],
            ["RJ", "$1,221,962.00", "$3,182.19", 384, 44],
            ["MG", "$1,456,938.00", "$3,153.55", 462, 51],
            ["MT", "$1,204,402.00", "$3,152.88", 382, 44],
            ["RS", "$942,658.00", "$3,152.70", 299, 36],
            ["PR", "$1,106,404.00", "$3,152.15", 351, 43],
            ["PI", "$1,038,227.00", "$3,146.14", 330, 41],
            ["ES", "$1,253,099.00", "$3,140.60", 399, 53],
            ["SE", "$1,222,707.00", "$3,127.13", 391, 45],
            ["GO", "$1,354,592.00", "$3,121.18", 434, 50],
            ["PA", "$1,259,798.00", "$3,102.95", 406, 47],
            ["AP", "$1,238,600.00", "$3,081.09", 402, 50],
            ["SP", "$1,099,359.00", "$3,070.84", 358, 42],
            ["BA", "$1,042,334.00", "$3,047.76", 342, 42],
            ["RR", "$1,473,796.00", "$3,045.03", 484, 55],
            ["SC", "$1,167,493.00", "$3,016.78", 387, 47],
            ["PB", "$903,349.00", "$2,991.22", 302, 39],
            ["MS", "$1,051,271.00", "$2,944.74", 357, 43]
          ]
        },
        explanation: "Sim, o estado influencia. Observamos que estados do Nordeste como **Ceará (CE)** e **Alagoas (AL)** lideram o ranking de valor médio por pedido, superando estados com maior volume total de vendas como SP ou MG. Isso sugere comportamentos de compra distintos regionalmente, onde certas regiões podem ter menos frequência mas tickets mais altos."
      }
    ]
  },
  {
    id: "top-vendas",
    title: "3. Top Estados e Cidades",
    subItems: [
      {
        id: "3.1",
        title: "Ranking por Estado",
        question: "Quais são os estados com maior valor em vendas? Liste-os em ordem decrescente.",
        sql: `SELECT 
    c.estado,
    SUM(i.quantidade * i.preco_unitario):: money AS total_vendas
FROM clientes c
JOIN pedidos p ON p.cliente_id = c.cliente_id
JOIN itens_pedido i ON i.pedido_id = p.pedido_id
GROUP BY c.estado
ORDER BY total_vendas DESC;`,
        dataOutput: {
          headers: ["estado", "total_vendas"],
          rows: [
            ["RR", "$1,474,032.31"],
            ["MG", "$1,457,155.25"],
            ["MA", "$1,384,594.82"],
            ["AL", "$1,359,630.86"],
            ["GO", "$1,354,809.31"],
            ["TO", "$1,269,831.74"],
            ["PA", "$1,260,003.63"],
            ["ES", "$1,253,289.88"],
            ["AP", "$1,238,794.24"],
            ["AM", "$1,227,051.64"],
            ["SE", "$1,222,908.69"],
            ["RJ", "$1,222,157.73"],
            ["MT", "$1,204,594.13"],
            ["DF", "$1,194,525.56"],
            ["SC", "$1,167,676.55"],
            ["PR", "$1,106,582.40"],
            ["SP", "$1,099,539.05"],
            ["AC", "$1,097,845.56"],
            ["MS", "$1,051,444.47"],
            ["RO", "$1,046,203.66"],
            ["BA", "$1,042,502.51"],
            ["PI", "$1,038,389.24"],
            ["CE", "$1,005,478.74"],
            ["PE", "$999,038.98"],
            ["RS", "$942,801.23"],
            ["RN", "$920,530.35"],
            ["PB", "$903,501.68"]
          ]
        },
        explanation: "Em nível estadual, **Roraima (RR)** surpreendentemente lidera o total de vendas, seguido de perto por Minas Gerais. Isso pode indicar uma campanha específica ou um comportamento de compra muito forte nesta região para os produtos analisados."
      },
      {
        id: "3.2",
        title: "Ranking por Cidade",
        question: "Quais são as cidades com maior valor em vendas? Liste-os em ordem decrescente.",
        sql: `SELECT 
    c.cidade,
    SUM(i.quantidade * i.preco_unitario):: money AS total_vendas
FROM clientes c
JOIN pedidos p ON p.cliente_id = c.cliente_id
JOIN itens_pedido i ON i.pedido_id = p.pedido_id
GROUP BY c.cidade
ORDER BY total_vendas DESC;`,
        dataOutput: {
          headers: ["cidade", "total_vendas"],
          rows: [
            ["Sao Paulo", "$13,732,895.50"],
            ["Rio de Janeiro", "$4,417,634.80"],
            ["Maranhao", "$4,375,391.24"],
            ["Goiania", "$4,274,925.63"],
            ["Curitiba", "$2,436,370.28"],
            ["Belo Horizonte", "$2,307,696.76"]
          ]
        },
        explanation: "Em nível municipal, a cidade de **São Paulo** domina absolutamente, com um volume de vendas ($13.7M) mais de 3 vezes superior ao segundo colocado, Rio de Janeiro. Nota-se a correção de dados mencionada (Maranhao -> Maranhão) refletida na consistência dos resultados."
      }
    ]
  },
  {
    id: "status-pedido",
    title: "4. Influência no Status",
    subItems: [
      {
        id: "4.1",
        title: "Influência da Categoria",
        question: "4.1 A categoria do produto influencia no status no pedido?",
        sql: `SELECT
    produtos.categoria,
    pedidos.status,
    COUNT(DISTINCT pedidos.pedido_id) AS total_pedidos,
    ROUND(
        COUNT(DISTINCT pedidos.pedido_id) * 100.0 
        / SUM(COUNT(DISTINCT pedidos.pedido_id)) OVER (PARTITION BY produtos.categoria)
    , 2) AS percentual
FROM pedidos

JOIN itens_pedido ON
itens_pedido.pedido_id = pedidos.pedido_id

JOIN produtos ON 
produtos.produto_id = itens_pedido.produto_id

GROUP BY produtos.categoria, pedidos.status
ORDER BY pedidos.status, percentual DESC;`,
        dataOutput: {
          headers: ["categoria", "status", "total_pedidos", "percentual"],
          rows: [
            ["Roupas", "CANCELADO", 1091, "17.12"],
            ["Decoração", "CANCELADO", 561, "16.72"],
            ["Livros", "CANCELADO", 629, "16.68"],
            ["Eletrônicos", "CANCELADO", 870, "16.57"],
            ["Alimentos", "CANCELADO", 238, "16.31"],
            ["Esportes", "CANCELADO", 391, "16.16"],
            ["Brinquedos", "CANCELADO", 312, "15.30"],
            ["Brinquedos", "Confirmado", 1390, "68.17"],
            ["Alimentos", "Confirmado", 993, "68.06"],
            ["Livros", "Confirmado", 2521, "66.87"],
            ["Eletrônicos", "Confirmado", 3493, "66.53"],
            ["Esportes", "Confirmado", 1609, "66.52"],
            ["Decoração", "Confirmado", 2222, "66.23"],
            ["Roupas", "Confirmado", 4195, "65.83"],
            ["Esportes", "Pending", 419, "17.32"],
            ["Decoração", "Pending", 572, "17.05"],
            ["Roupas", "Pending", 1086, "17.04"],
            ["Eletrônicos", "Pending", 887, "16.90"],
            ["Brinquedos", "Pending", 337, "16.53"],
            ["Livros", "Pending", 620, "16.45"],
            ["Alimentos", "Pending", 228, "15.63"]
          ]
        },
        explanation: "A análise mostra uma variação sutil mas existente. **Roupas** têm a maior taxa de cancelamento (17.12%), possivelmente devido a problemas de tamanho ou preferência. **Brinquedos** e **Alimentos** têm as maiores taxas de confirmação (>68%)."
      },
      {
        id: "4.2",
        title: "Influência da Quantidade",
        question: "4.2 A quantidade de itens do pedido influencia no status no pedido?",
        sql: `WITH pedidos_com_total_itens AS (
    SELECT
        ip.pedido_id,
        SUM(ip.quantidade) AS total_itens
    FROM
        itens_pedido ip
    GROUP BY
        ip.pedido_id
),
pedidos_agrupados AS (
    SELECT
        p.status,
        pcti.total_itens,
        COUNT(p.pedido_id) AS contagem_pedidos
    FROM
        pedidos p
    JOIN
        pedidos_com_total_itens pcti ON p.pedido_id = pcti.pedido_id
    WHERE
        pcti.total_itens BETWEEN 1 AND 17
    GROUP BY
        p.status,
        pcti.total_itens
)
SELECT
    status,
    total_itens,
    contagem_pedidos,
    ROUND(
        (contagem_pedidos * 100.0) / SUM(contagem_pedidos) OVER (PARTITION BY status)
    , 2) AS percentual_no_status
FROM
    pedidos_agrupados
ORDER BY
    status,
    total_itens;`,
        dataOutput: {
          headers: ["status", "total_itens", "contagem_pedidos", "percentual_no_status"],
          rows: [
            ["CANCELADO", 1, 85, "5.05"],
            ["CANCELADO", 2, 116, "6.89"],
            ["CANCELADO", 3, 178, "10.58"],
            ["CANCELADO", 4, 159, "9.45"],
            ["CANCELADO", 5, 208, "12.36"],
            ["CANCELADO", 6, 191, "11.35"],
            ["CANCELADO", 7, 167, "9.92"],
            ["CANCELADO", 8, 145, "8.62"],
            ["CANCELADO", 9, 151, "8.97"],
            ["CANCELADO", 10, 127, "7.55"],
            ["CANCELADO", 11, 71, "4.22"],
            ["CANCELADO", 12, 46, "2.73"],
            ["CANCELADO", 13, 25, "1.49"],
            ["CANCELADO", 14, 8, "0.48"],
            ["CANCELADO", 15, 2, "0.12"],
            ["CANCELADO", 16, 3, "0.18"],
            ["CANCELADO", 17, 1, "0.06"],
            ["Confirmado", 1, 284, "4.27"],
            ["Confirmado", 2, 471, "7.08"],
            ["Confirmado", 3, 632, "9.51"],
            ["Confirmado", 4, 661, "9.94"],
            ["Confirmado", 5, 729, "10.97"],
            ["Confirmado", 6, 761, "11.45"],
            ["Confirmado", 7, 670, "10.08"],
            ["Confirmado", 8, 689, "10.36"],
            ["Confirmado", 9, 562, "8.45"],
            ["Confirmado", 10, 499, "7.51"],
            ["Confirmado", 11, 324, "4.87"],
            ["Confirmado", 12, 215, "3.23"],
            ["Confirmado", 13, 104, "1.56"],
            ["Confirmado", 14, 34, "0.51"],
            ["Confirmado", 15, 11, "0.17"],
            ["Confirmado", 16, 2, "0.03"],
            ["Pending", 1, 66, "3.95"],
            ["Pending", 2, 105, "6.29"],
            ["Pending", 3, 178, "10.67"],
            ["Pending", 4, 152, "9.11"],
            ["Pending", 5, 197, "11.80"],
            ["Pending", 6, 213, "12.76"],
            ["Pending", 7, 151, "9.05"],
            ["Pending", 8, 176, "10.55"],
            ["Pending", 9, 138, "8.27"],
            ["Pending", 10, 127, "7.61"],
            ["Pending", 11, 83, "4.97"],
            ["Pending", 12, 45, "2.70"],
            ["Pending", 13, 27, "1.62"],
            ["Pending", 14, 7, "0.42"],
            ["Pending", 15, 2, "0.12"],
            ["Pending", 16, 2, "0.12"]
          ]
        },
        explanation: "Pedidos com quantidades muito altas tendem a ter comportamentos atípicos, mas a distribuição percentual entre status parece seguir um padrão similar independentemente da quantidade, com picos de volume entre 3 e 8 itens."
      }
    ]
  },
  {
    id: "metricas-extras",
    title: "5. Métricas Extras",
    subItems: [
      {
        id: "5.1",
        title: "Taxa de Conversão",
        question: "5.1 Taxa de conversão de clientes por grupo",
        sql: `WITH clientes_com_pedidos AS (
    -- Conta quantos pedidos cada cliente fez
    SELECT
        cliente_id,
        COUNT(pedido_id) AS total_pedidos
    FROM
        pedidos
    GROUP BY
        cliente_id
)
SELECT
    c.grupo,
    COUNT(DISTINCT c.cliente_id) AS total_clientes_no_grupo,
    SUM(CASE WHEN ccp.total_pedidos > 0 THEN 1 ELSE 0 END) AS clientes_compradores,
    ROUND(
        (SUM(CASE WHEN ccp.total_pedidos > 0 THEN 1 ELSE 0 END) * 100.0) / COUNT(DISTINCT c.cliente_id)
    , 2) AS taxa_conversao_percentual
FROM
    clientes c
LEFT JOIN
    clientes_com_pedidos ccp ON c.cliente_id = ccp.cliente_id
GROUP BY
    c.grupo
ORDER BY
    taxa_conversao_percentual DESC;`,
        dataOutput: {
          headers: ["grupo", "total_clientes_no_grupo", "clientes_compradores", "taxa_conversao_percentual"],
          rows: [
            ["A", 413, 413, "100.00"],
            ["B", 398, 398, "100.00"],
            ["C", 389, 389, "100.00"]
          ]
        },
        explanation: "Investigamos a taxa de conversão por grupo. Curiosamente, todos os grupos têm 100% de conversão na amostra, indicando que a base analisada é composta apenas de clientes ativos."
      },
      {
        id: "5.2",
        title: "Vendas por Categoria e Grupo",
        question: "5.2 Percentual de vendas por categoria dentro de cada grupo",
        sql: `WITH vendas_por_grupo_categoria AS (
    SELECT
        c.grupo,
        pr.categoria,
        SUM(ip.subtotal) AS valor_total_categoria
    FROM
        clientes c
    JOIN
        pedidos p ON c.cliente_id = p.cliente_id
    JOIN
        itens_pedido ip ON p.pedido_id = ip.pedido_id
    JOIN
        produtos pr ON ip.produto_id = pr.produto_id
    GROUP BY
        c.grupo,
        pr.categoria
)
SELECT
    grupo,
    categoria,
    valor_total_categoria::money,
    -- Percentual da categoria no total de vendas DAQUELE GRUPO
    ROUND(
        (valor_total_categoria * 100.0) / SUM(valor_total_categoria) OVER (PARTITION BY grupo)
    , 2) AS percentual_no_grupo
FROM
    vendas_por_grupo_categoria
ORDER BY
    grupo,
    percentual_no_grupo DESC;`,
        dataOutput: {
          headers: ["grupo", "categoria", "valor_total_categoria", "percentual_no_grupo"],
          rows: [
            ["A", "Roupas", "$3,084,099.31", "30.50"],
            ["A", "Eletrônicos", "$2,301,129.02", "22.76"],
            ["A", "Livros", "$1,374,050.32", "13.59"],
            ["A", "Decoração", "$1,236,680.07", "12.23"],
            ["A", "Esportes", "$984,647.00", "9.74"],
            ["A", "Brinquedos", "$664,202.27", "6.57"],
            ["A", "Alimentos", "$467,592.05", "4.62"],
            ["B", "Roupas", "$3,421,484.38", "30.90"],
            ["B", "Eletrônicos", "$2,572,830.20", "23.24"],
            ["B", "Livros", "$1,425,853.87", "12.88"],
            ["B", "Decoração", "$1,321,240.77", "11.93"],
            ["B", "Esportes", "$1,028,037.19", "9.28"],
            ["B", "Brinquedos", "$753,921.87", "6.81"],
            ["B", "Alimentos", "$548,924.13", "4.96"],
            ["C", "Roupas", "$3,135,965.73", "30.27"],
            ["C", "Eletrônicos", "$2,430,656.68", "23.46"],
            ["C", "Livros", "$1,378,185.11", "13.30"],
            ["C", "Decoração", "$1,253,805.03", "12.10"],
            ["C", "Esportes", "$977,224.35", "9.43"],
            ["C", "Brinquedos", "$676,013.60", "6.53"],
            ["C", "Alimentos", "$508,371.26", "4.91"]
          ]
        },
        explanation: "Na análise de categorias (5.2), o **Grupo B** (nosso escolhido) mostra uma preferência ligeiramente maior por **Eletrônicos** (23.24%) em comparação ao Grupo A (22.76%), reforçando seu perfil de maior valor agregado."
      }
    ]
  }
];
