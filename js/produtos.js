// Cada produto possui sua própria galeria com quatro imagens locais.
// Valores em centavos evitam erros de arredondamento.
const PRODUTOS = [
  {
    "id": "biblioteca",
    "nome": "A Biblioteca da Meia-Noite",
    "autor": "Matt Haig",
    "preco": 5490,
    "imagem": "produtos/biblioteca/principal.png",
    "categoria": "livros",
    "genero": "Ficção",
    "formato": "LIVRO · CAPA COMUM",
    "descricao": "Uma viagem sensível sobre escolhas e possibilidades. Entre a vida e a morte, Nora encontra uma biblioteca onde cada livro guarda uma vida que poderia ter vivido.",
    "galeria": [
      "produtos/biblioteca/principal.png",
      "produtos/biblioteca/cena-2.webp",
      "produtos/biblioteca/cena-3.webp",
      "produtos/biblioteca/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "verity",
    "nome": "Verity",
    "autor": "Colleen Hoover",
    "preco": 4990,
    "imagem": "produtos/verity/principal.png",
    "categoria": "livros",
    "genero": "Suspense",
    "formato": "LIVRO · CAPA COMUM",
    "descricao": "Uma escritora aceita concluir uma série de sucesso e encontra um manuscrito que transforma sua visão sobre a autora e sua família.",
    "galeria": [
      "produtos/verity/principal.png",
      "produtos/verity/cena-2.webp",
      "produtos/verity/cena-3.webp",
      "produtos/verity/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "jogos-vorazes",
    "nome": "Jogos Vorazes",
    "autor": "Suzanne Collins",
    "preco": 5990,
    "imagem": "produtos/jogos-vorazes/principal.png",
    "categoria": "livros",
    "genero": "Fantasia",
    "formato": "LIVRO · CAPA COMUM",
    "descricao": "Katniss Everdeen se oferece para participar dos Jogos Vorazes no lugar da irmã. Uma história de sobrevivência, coragem e resistência.",
    "galeria": [
      "produtos/jogos-vorazes/principal.png",
      "produtos/jogos-vorazes/cena-2.webp",
      "produtos/jogos-vorazes/cena-3.webp",
      "produtos/jogos-vorazes/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "jantar-secreto",
    "nome": "Jantar Secreto",
    "autor": "Rafael Montes",
    "preco": 8490,
    "imagem": "produtos/jantar-secreto/principal.png",
    "categoria": "livros",
    "genero": "Suspense",
    "formato": "LIVRO · CAPA DURA",
    "descricao": "Quatro amigos se mudam para o Rio de Janeiro e organizam jantares que os envolvem em uma sequência de escolhas cada vez mais sombrias.",
    "galeria": [
      "produtos/jantar-secreto/principal.png",
      "produtos/jantar-secreto/cena-2.webp",
      "produtos/jantar-secreto/cena-3.webp",
      "produtos/jantar-secreto/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "conto-aia",
    "nome": "O Conto da Aia",
    "autor": "Margaret Atwood",
    "preco": 3990,
    "imagem": "produtos/conto-aia/principal.png",
    "categoria": "livros",
    "genero": "Ficção",
    "formato": "LIVRO · CAPA DURA",
    "descricao": "Em uma sociedade autoritária, uma mulher tenta preservar sua identidade e suas lembranças. Uma narrativa sobre liberdade e resistência.",
    "galeria": [
      "produtos/conto-aia/principal.png",
      "produtos/conto-aia/cena-2.webp",
      "produtos/conto-aia/cena-3.webp",
      "produtos/conto-aia/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "vantagens",
    "nome": "As Vantagens de Ser Invisível",
    "autor": "Stephen Chbosky",
    "preco": 7990,
    "imagem": "produtos/vantagens/principal.png",
    "categoria": "livros",
    "genero": "Romance",
    "formato": "LIVRO · CAPA DURA",
    "descricao": "Nas cartas de Charlie, a descoberta da amizade, da música e de um lugar no mundo.",
    "galeria": [
      "produtos/vantagens/principal.png",
      "produtos/vantagens/cena-2.webp",
      "produtos/vantagens/cena-3.webp",
      "produtos/vantagens/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "melhor-filmes",
    "nome": "Melhor do que nos Filmes",
    "autor": "Lynn Painter",
    "preco": 7990,
    "imagem": "produtos/melhor-filmes/principal.png",
    "categoria": "livros",
    "genero": "Romance",
    "formato": "LIVRO · CAPA COMUM",
    "descricao": "Uma comédia romântica sobre expectativas, encontros inesperados e a descoberta do amor fora do roteiro.",
    "galeria": [
      "produtos/melhor-filmes/principal.png",
      "produtos/melhor-filmes/cena-2.webp",
      "produtos/melhor-filmes/cena-3.webp",
      "produtos/melhor-filmes/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "zaratrusta",
    "nome": "Assim Falava Zaratustra",
    "autor": "Friedrich Nietzsche",
    "preco": 9990,
    "imagem": "produtos/zaratrusta/principal.png",
    "categoria": "livros",
    "genero": "Não ficção",
    "formato": "LIVRO · CAPA DURA",
    "descricao": "Uma obra filosófica que convida a questionar valores e pensar a existência.",
    "galeria": [
      "produtos/zaratrusta/principal.png",
      "produtos/zaratrusta/cena-2.webp",
      "produtos/zaratrusta/cena-3.webp",
      "produtos/zaratrusta/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "subsolo",
    "nome": "Memórias do Subsolo",
    "autor": "Fiódor Dostoiévski",
    "preco": 8990,
    "imagem": "produtos/subsolo/principal.png",
    "categoria": "livros",
    "genero": "Ficção",
    "formato": "LIVRO · CAPA DURA",
    "descricao": "Um narrador inquieto examina suas contradições e sua relação com a sociedade.",
    "galeria": [
      "produtos/subsolo/principal.png",
      "produtos/subsolo/cena-2.webp",
      "produtos/subsolo/cena-3.webp",
      "produtos/subsolo/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "igor",
    "nome": "IGOR",
    "autor": "Tyler The Creator",
    "preco": 18990,
    "imagem": "produtos/igor/principal.png",
    "categoria": "musica",
    "genero": "Hip-hop",
    "formato": "VINIL · LP",
    "descricao": "Uma edição em vinil para ouvir com calma e guardar na sua coleção.",
    "galeria": [
      "produtos/igor/principal.png",
      "produtos/igor/cena-2.webp",
      "produtos/igor/cena-3.webp",
      "produtos/igor/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "graduation",
    "nome": "Graduation",
    "autor": "Kanye West",
    "preco": 21990,
    "imagem": "produtos/graduation/principal.png",
    "categoria": "musica",
    "genero": "Hip-hop",
    "formato": "VINIL · LP",
    "descricao": "Uma edição em vinil para ouvir com calma e guardar na sua coleção.",
    "galeria": [
      "produtos/graduation/principal.png",
      "produtos/graduation/cena-2.webp",
      "produtos/graduation/cena-3.webp",
      "produtos/graduation/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "pink-friday",
    "nome": "Pink Friday",
    "autor": "Nicki Minaj",
    "preco": 19990,
    "imagem": "produtos/pink-friday/principal.png",
    "categoria": "musica",
    "genero": "Pop",
    "formato": "VINIL · LP",
    "descricao": "Uma edição em vinil para ouvir com calma e guardar na sua coleção.",
    "galeria": [
      "produtos/pink-friday/principal.png",
      "produtos/pink-friday/cena-2.webp",
      "produtos/pink-friday/cena-3.webp",
      "produtos/pink-friday/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "portals",
    "nome": "Portals",
    "autor": "Melanie Martinez",
    "preco": 24990,
    "imagem": "produtos/portals/principal.png",
    "categoria": "musica",
    "genero": "Pop",
    "formato": "VINIL · LP",
    "descricao": "Uma edição em vinil para ouvir com calma e guardar na sua coleção.",
    "galeria": [
      "produtos/portals/principal.png",
      "produtos/portals/cena-2.webp",
      "produtos/portals/cena-3.webp",
      "produtos/portals/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Vinil rosa sobre linho · ilustração",
      "Capa e vinil em ambiente · ilustração",
      "Vinil em exposição · ilustração"
    ]
  },
  {
    "id": "brat",
    "nome": "brat",
    "autor": "Charli XCX",
    "preco": 17990,
    "imagem": "produtos/brat/principal.png",
    "categoria": "musica",
    "genero": "Pop",
    "formato": "VINIL · LP",
    "descricao": "Uma edição em vinil para ouvir com calma e guardar na sua coleção.",
    "galeria": [
      "produtos/brat/principal.png",
      "produtos/brat/cena-2.webp",
      "produtos/brat/cena-3.webp",
      "produtos/brat/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "lush",
    "nome": "Lush",
    "autor": "Mitski",
    "preco": 20990,
    "imagem": "produtos/lush/principal.png",
    "categoria": "musica",
    "genero": "Indie",
    "formato": "VINIL · LP",
    "descricao": "Uma edição em vinil para ouvir com calma e guardar na sua coleção.",
    "galeria": [
      "produtos/lush/principal.png",
      "produtos/lush/cena-2.webp",
      "produtos/lush/cena-3.webp",
      "produtos/lush/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "castelos",
    "nome": "Castelos e Ruínas",
    "autor": "BK’",
    "preco": 19990,
    "imagem": "produtos/castelos/principal.png",
    "categoria": "musica",
    "genero": "Hip-hop",
    "formato": "VINIL · LP",
    "descricao": "Uma edição em vinil para ouvir com calma e guardar na sua coleção.",
    "galeria": [
      "produtos/castelos/principal.png",
      "produtos/castelos/cena-2.webp",
      "produtos/castelos/cena-3.webp",
      "produtos/castelos/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "racionais",
    "nome": "Sobrevivendo no Inferno",
    "autor": "Racionais",
    "preco": 24990,
    "imagem": "produtos/racionais/principal.png",
    "categoria": "musica",
    "genero": "Hip-hop",
    "formato": "VINIL · LP",
    "descricao": "Uma edição em vinil para ouvir com calma e guardar na sua coleção.",
    "galeria": [
      "produtos/racionais/principal.png",
      "produtos/racionais/cena-2.webp",
      "produtos/racionais/cena-3.webp",
      "produtos/racionais/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "paranoid",
    "nome": "Paranoid",
    "autor": "Black Sabbath",
    "preco": 18990,
    "imagem": "produtos/paranoid/principal.png",
    "categoria": "musica",
    "genero": "Rock",
    "formato": "VINIL · LP",
    "descricao": "Uma edição em vinil para ouvir com calma e guardar na sua coleção.",
    "galeria": [
      "produtos/paranoid/principal.png",
      "produtos/paranoid/cena-2.webp",
      "produtos/paranoid/cena-3.webp",
      "produtos/paranoid/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "trilogia-jv",
    "nome": "Trilogia Jogos Vorazes - Limitado",
    "autor": "Suzanne Collins",
    "preco": 24990,
    "imagem": "produtos/trilogia-jv/principal.png",
    "categoria": "colecoes",
    "genero": "Fantasia",
    "formato": "COLEÇÃO · BOX",
    "descricao": "Uma coleção para descobrir novos mundos e revisitar suas histórias favoritas.",
    "galeria": [
      "produtos/trilogia-jv/principal.png",
      "produtos/trilogia-jv/cena-2.webp",
      "produtos/trilogia-jv/cena-3.webp",
      "produtos/trilogia-jv/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "harry-potter",
    "nome": "Harry Potter 4, 5 e 6 - Especial",
    "autor": "J.K. Rowling",
    "preco": 17990,
    "imagem": "produtos/harry-potter/principal.png",
    "categoria": "colecoes",
    "genero": "Fantasia",
    "formato": "COLEÇÃO · BOX",
    "descricao": "Uma coleção para descobrir novos mundos e revisitar suas histórias favoritas.",
    "galeria": [
      "produtos/harry-potter/principal.png",
      "produtos/harry-potter/cena-2.webp",
      "produtos/harry-potter/cena-3.webp",
      "produtos/harry-potter/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "lovecraft",
    "nome": "Box Contos de Lovecraft",
    "autor": "H.P. Lovecraft",
    "preco": 9990,
    "imagem": "produtos/lovecraft/principal.png",
    "categoria": "colecoes",
    "genero": "Suspense",
    "formato": "COLEÇÃO · BOX",
    "descricao": "Uma coleção para descobrir novos mundos e revisitar suas histórias favoritas.",
    "galeria": [
      "produtos/lovecraft/principal.png",
      "produtos/lovecraft/cena-2.webp",
      "produtos/lovecraft/cena-3.webp",
      "produtos/lovecraft/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "trono-vidro",
    "nome": "O Trono de Vidro - Box Completo",
    "autor": "Sarah J. Maas",
    "preco": 44990,
    "imagem": "produtos/trono-vidro/principal.png",
    "categoria": "colecoes",
    "genero": "Fantasia",
    "formato": "COLEÇÃO · BOX",
    "descricao": "Uma coleção para descobrir novos mundos e revisitar suas histórias favoritas.",
    "galeria": [
      "produtos/trono-vidro/principal.png",
      "produtos/trono-vidro/cena-2.webp",
      "produtos/trono-vidro/cena-3.webp",
      "produtos/trono-vidro/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "rebecca",
    "nome": "Coleção Rebecca Yarros",
    "autor": "Rebecca Yarros",
    "preco": 60290,
    "imagem": "produtos/rebecca/principal.png",
    "categoria": "colecoes",
    "genero": "Fantasia",
    "formato": "COLEÇÃO · BOX",
    "descricao": "Uma coleção para descobrir novos mundos e revisitar suas histórias favoritas.",
    "galeria": [
      "produtos/rebecca/principal.png",
      "produtos/rebecca/cena-2.webp",
      "produtos/rebecca/cena-3.webp",
      "produtos/rebecca/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "star-wars",
    "nome": "Coleção Star Wars Deluxe",
    "autor": "George Lucas",
    "preco": 169990,
    "imagem": "produtos/star-wars/principal.png",
    "categoria": "colecoes",
    "genero": "Ficção",
    "formato": "COLEÇÃO · BOX",
    "descricao": "Uma coleção para descobrir novos mundos e revisitar suas histórias favoritas.",
    "galeria": [
      "produtos/star-wars/principal.png",
      "produtos/star-wars/cena-2.webp",
      "produtos/star-wars/cena-3.webp",
      "produtos/star-wars/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "gelo-fogo",
    "nome": "Box As Crônicas de Gelo e Fogo",
    "autor": "George R.R. Martin",
    "preco": 54990,
    "imagem": "produtos/gelo-fogo/principal.png",
    "categoria": "colecoes",
    "genero": "Fantasia",
    "formato": "COLEÇÃO · BOX",
    "descricao": "Uma coleção para descobrir novos mundos e revisitar suas histórias favoritas.",
    "galeria": [
      "produtos/gelo-fogo/principal.png",
      "produtos/gelo-fogo/cena-2.webp",
      "produtos/gelo-fogo/cena-3.webp",
      "produtos/gelo-fogo/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "senhor-aneis",
    "nome": "Trilogia Senhor dos Anéis",
    "autor": "J.R.R. Tolkien",
    "preco": 19990,
    "imagem": "produtos/senhor-aneis/principal.png",
    "categoria": "colecoes",
    "genero": "Fantasia",
    "formato": "COLEÇÃO · BOX",
    "descricao": "Uma coleção para descobrir novos mundos e revisitar suas histórias favoritas.",
    "galeria": [
      "produtos/senhor-aneis/principal.png",
      "produtos/senhor-aneis/cena-2.webp",
      "produtos/senhor-aneis/cena-3.webp",
      "produtos/senhor-aneis/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "witcher",
    "nome": "The Witcher - Box Completo",
    "autor": "Andrzej Sapkowski",
    "preco": 39990,
    "imagem": "produtos/witcher/principal.png",
    "categoria": "colecoes",
    "genero": "Fantasia",
    "formato": "COLEÇÃO · BOX",
    "descricao": "Uma coleção para descobrir novos mundos e revisitar suas histórias favoritas.",
    "galeria": [
      "produtos/witcher/principal.png",
      "produtos/witcher/cena-2.webp",
      "produtos/witcher/cena-3.webp",
      "produtos/witcher/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "amanhecer",
    "nome": "Amanhecer na Colheita",
    "autor": "Suzanne Collins",
    "preco": 9190,
    "imagem": "produtos/amanhecer/principal.png",
    "categoria": "livros",
    "genero": "Fantasia",
    "formato": "LIVRO · CAPA DURA",
    "descricao": "O retorno a Panem para conhecer os jogos que marcaram a juventude de Haymitch Abernathy.",
    "galeria": [
      "produtos/amanhecer/principal.png",
      "produtos/amanhecer/cena-2.webp",
      "produtos/amanhecer/cena-3.webp",
      "produtos/amanhecer/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  },
  {
    "id": "donnie-darko",
    "nome": "Donnie Darko",
    "autor": "Richard Kelly",
    "preco": 8790,
    "imagem": "produtos/donnie-darko/principal.png",
    "categoria": "livros",
    "genero": "Ficção",
    "formato": "LIVRO · CAPA DURA",
    "descricao": "Uma edição para explorar o universo de Donnie Darko, entre tempo, escolhas e possibilidades.",
    "galeria": [
      "produtos/donnie-darko/principal.png",
      "produtos/donnie-darko/cena-2.webp",
      "produtos/donnie-darko/cena-3.webp",
      "produtos/donnie-darko/cena-4.webp"
    ],
    "legendas": [
      "Imagem principal",
      "Composição sobre linho · imagem ilustrativa",
      "Composição em ambiente · imagem ilustrativa",
      "Composição em estúdio · imagem ilustrativa"
    ]
  }
];
