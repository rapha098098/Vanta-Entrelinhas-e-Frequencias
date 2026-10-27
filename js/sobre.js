// Conteúdo institucional separado do catálogo para facilitar a manutenção.
function renderAbout() {
  main.innerHTML = `
  <div class="about-vanta">
    <nav class="breadcrumb" aria-label="Localização"><a href="index.html">Início</a> / Sobre nós</nav>
    <section class="about-hero" aria-labelledby="about-title">
      <div class="about-intro">
        <span class="eyebrow">VANTA · ENTRELINHAS E FREQUÊNCIAS</span>
        <h1 id="about-title">Toda história<br>merece um<br><em>bom encontro.</em></h1>
        <p>Um livro que fica com você. Um disco que toca de um jeito diferente. A Vanta é um convite para descobrir o que faz sentido no seu mundo.</p>
        <a class="btn" href="produtos.html">Encontre sua próxima história <span aria-hidden="true">↗</span></a>
        <div class="about-signature"><span aria-hidden="true">✳</span> Para ler, ouvir e sentir.</div>
      </div>
      <div class="about-art">
        <img class="about-photo" src="assets/imagens/produtos/verity/cena-3.webp" alt="Livro em um ambiente acolhedor de leitura">
        <div class="about-record"><img src="assets/imagens/produtos/igor/principal.png" alt="Disco IGOR, de Tyler The Creator"><span>O som também conta histórias.</span></div>
        <span class="about-art-note">ESCOLHA COM CALMA. LEVE COM AFETO.</span>
      </div>
    </section>
    <div class="about-ribbon" aria-hidden="true"><span>Páginas que abraçam</span><b>✳</b><span>Faixas que acompanham</span><b>✳</b><span>Descobertas que ficam</span></div>
    <section class="about-manifesto" aria-labelledby="manifesto-title">
      <div><span class="eyebrow">NOSSO UNIVERSO</span><h2 id="manifesto-title">Entre uma página<br>e outra, <em>dê o play.</em></h2></div>
      <div><p>Acreditamos nos encontros que a cultura proporciona. Na frase que você sublinha, no refrão que vira memória e na vontade de compartilhar uma descoberta.</p><p>Por isso, reunimos literatura e música no mesmo lugar: para que sua próxima escolha seja também uma nova forma de sentir.</p></div>
    </section>
    <section class="about-paths" aria-label="Explore o universo Vanta">
      <a class="about-path" href="produtos.html?categoria=livros"><div class="about-path-image"><img src="assets/imagens/produtos/biblioteca/principal.png" alt="A Biblioteca da Meia-Noite" loading="lazy"></div><div><span class="eyebrow">01 / ENTRELINHAS</span><h3>Histórias para ler.</h3><p>Novos mundos, outras perspectivas e aquela vontade de só mais um capítulo.</p><span class="about-link">Explore os livros ↗</span></div></a>
      <a class="about-path" href="produtos.html?categoria=musica"><div class="about-path-image"><img src="assets/imagens/produtos/castelos/principal.png" alt="Vinil Castelos e Ruínas" loading="lazy"></div><div><span class="eyebrow">02 / FREQUÊNCIAS</span><h3>Histórias para ouvir.</h3><p>Do primeiro acorde ao último lado do disco. Encontre a trilha do seu momento.</p><span class="about-link">Explore os discos ↗</span></div></a>
    </section>
    <section class="about-values" aria-label="O que inspira a Vanta">
      <article><span class="about-value-number">01</span><h3>Curiosidade sempre.</h3><p>Há uma nova voz, um novo universo e uma nova frequência para descobrir.</p></article>
      <article><span class="about-value-number">02</span><h3>Escolhas com significado.</h3><p>Uma seleção que aproxima diferentes estilos, histórias e formas de expressão.</p></article>
      <article><span class="about-value-number">03</span><h3>Cultura para compartilhar.</h3><p>Porque uma boa história continua na conversa que vem depois.</p></article>
    </section>
    <section class="about-help" id="ajuda" aria-labelledby="help-title">
      <div class="about-help-intro"><span class="eyebrow">BOM SABER</span><h2 id="help-title">Uma loja criada<br>para <em>aprender.</em></h2><p>A Vanta é um projeto acadêmico do curso técnico de Informática. Você pode explorar o catálogo, guardar favoritos e experimentar uma compra simulada.</p><span class="about-demo">PROJETO DEMONSTRATIVO</span></div>
      <div class="about-faq" id="faq">
        <h3>Perguntas frequentes</h3>
        <details open><summary>Os produtos serão entregues?</summary><p>Não. Preços, estoque, frete e pedidos são demonstrativos. Não há cobrança, reserva, envio ou troca física de produtos.</p></details>
        <details><summary>Preciso criar uma conta?</summary><p>Não. Você pode concluir a simulação sem entrar. A conta de teste funciona apenas neste navegador.</p></details>
        <details id="contato"><summary>Como entro em contato?</summary><p>Os contatos da arte do rodapé são ilustrativos. Este protótipo acadêmico não oferece atendimento real nem envia e-mails.</p></details>
        <details id="privacidade"><summary>Como meus dados são utilizados?</summary><p>Não há cookies de rastreamento. Carrinho, favoritos, conta de teste e último pedido ficam no localStorage deste navegador. Você pode removê-los nas configurações de dados do site. Os dados de entrega não são armazenados após a confirmação.</p></details>
        <details id="termos"><summary>Quais são os termos da demonstração?</summary><p>Este projeto não realiza vendas ou pagamentos reais. As capas pertencem aos respectivos titulares e são usadas como referência acadêmica. As cenas adicionais dos produtos são ilustrações geradas com IA a partir dessas referências.</p></details>
      </div>
    </section>
    <section class="about-closing"><span class="eyebrow">SUA PRÓXIMA DESCOBERTA ESTÁ AQUI</span><h2>O que vai fazer parte<br>da sua história?</h2><a class="btn" href="produtos.html">Conheça nossa curadoria ↗</a></section>
  </div>`;
  // Abre também os destinos dos links institucionais do rodapé.
  function revealSection() {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.tagName === 'DETAILS') target.open = true;
    if (target) target.scrollIntoView({block: 'start'});
  }
  window.addEventListener('hashchange', revealSection);
  if (location.hash) requestAnimationFrame(revealSection);
}
