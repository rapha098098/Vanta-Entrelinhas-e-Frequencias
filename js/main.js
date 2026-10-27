'use strict';
const $ = selector => document.querySelector(selector);
const main = $('#conteudo');
const page = document.body.dataset.page;
const params = new URLSearchParams(location.search);
const money = cents => (cents / 100).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const img = name => 'assets/imagens/' + name;
const favorites = () => {
 const saved = CartNavigation.enabled ? CartNavigation.favoriteRaw : Storage.read('vanta_favoritos', []);
 return Array.isArray(saved) ? [...new Set(saved.filter(id => PRODUTOS.some(p => p.id === id)))] : [];
};
function saveFavorites(ids) {
 const valid = [...new Set(ids.filter(id => PRODUTOS.some(p => p.id === id)))];
 const saved = Storage.write('vanta_favoritos', valid, CartNavigation.enabled);
 if (CartNavigation.enabled) {
  CartNavigation.favoriteRaw = valid;
  CartNavigation.persist();
  return true;
 }
 return saved;
}
function refreshFavorites() {
 if (page === 'favoritos') { catalog(true); CartNavigation.syncLinks(); }
 const button = $('#favorite');
 if (button) {
  const active = favorites().includes(params.get('id'));
  button.setAttribute('aria-pressed', String(active));
  button.textContent = active ? '♥ Salvo nos favoritos' : '♡ Salvar nos favoritos';
 }
}
function toast(text) { $('#mensagem').textContent = text; $('#mensagem').classList.add('visivel'); clearTimeout(toast.timer); toast.timer = setTimeout(() => $('#mensagem').classList.remove('visivel'), 4000); }
function header() {
  const session = Storage.read('vanta_sessao', null);
  $('#cabecalho').innerHTML = `<div class="tarja">FRETE GRÁTIS ACIMA DE R$ 199 <span> • CULTURA QUE CHEGA ATÉ VOCÊ</span></div><div class="header-inner container"><a class="logo" href="index.html" aria-label="Vanta, página inicial"><img src="${img('00d89.png')}" alt="Vanta"></a><form class="busca" action="produtos.html" role="search"><label class="sr-only" for="busca">Buscar produtos</label><span aria-hidden="true">⌕</span><input id="busca" name="q" placeholder="Busque livros, artistas e discos..." value="${esc(params.get('q') || '')}"><button aria-label="Pesquisar">→</button></form><div class="header-actions"><a href="login.html">${session?.nome ? esc(session.nome.split(' ')[0]) : 'Entrar'}</a><a href="favoritos.html" aria-label="Favoritos">♡ <span>Favoritos</span></a><a href="carrinho.html" aria-label="Carrinho de compras">▣ <span>Carrinho</span> <b data-cart-count>0</b></a><button id="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu">☰</button></div></div><nav id="menu" aria-label="Menu principal"><a href="index.html">Início</a><a href="produtos.html?categoria=livros">Livros</a><a href="produtos.html?categoria=colecoes">Coleções</a><a href="produtos.html?categoria=musica">Música</a><a href="produtos.html?ofertas=1">Ofertas</a><a href="sobre.html">Sobre nós</a></nav>`;
  $('#menu-toggle').onclick = () => {const open = $('#menu-toggle').getAttribute('aria-expanded') !== 'true'; $('#menu-toggle').setAttribute('aria-expanded', open); $('#menu').classList.toggle('aberto', open);};
  $('#rodape').innerHTML = `<div class="footer-desktop"><img src="${img('ef2fb.png')}" alt="Vanta — Entrelinhas e Frequências. Histórias para ler. Histórias para ouvir." width="1440" height="344"><nav class="footer-links" aria-label="Links do rodapé"><a style="left:44.4%;top:24%;width:16%;height:8%" href="produtos.html?categoria=livros">Livros</a><a style="left:44.4%;top:35%;width:16%;height:8%" href="produtos.html?categoria=musica">Música</a><a style="left:44.4%;top:46%;width:16%;height:8%" href="produtos.html">Novidades</a><a style="left:44.4%;top:57%;width:16%;height:8%" href="produtos.html?ofertas=1">Ofertas</a><a style="left:61.4%;top:24%;width:16%;height:8%" href="sobre.html#ajuda">Ajuda</a><a style="left:61.4%;top:35%;width:16%;height:8%" href="sobre.html#ajuda">Trocas</a><a style="left:61.4%;top:46%;width:16%;height:8%" href="sobre.html#faq">FAQ</a><a style="left:61.4%;top:57%;width:16%;height:8%" href="sobre.html#contato">Contato</a><a style="left:80.2%;top:26%;width:18%;height:8%" href="sobre.html#contato">Instagram ilustrativo da Vanta</a><a style="left:80.2%;top:40%;width:18%;height:8%" href="sobre.html#contato">E-mail ilustrativo da Vanta</a><a style="left:78.6%;top:89%;width:7%;height:7%" href="sobre.html#privacidade">Privacidade</a><a style="left:85.8%;top:89%;width:5%;height:7%" href="sobre.html#termos">Termos</a><a style="left:90.4%;top:89%;width:5%;height:7%" href="sobre.html#privacidade">Cookies</a></nav></div><div class="footer-mobile"><h2>VANTA<span>ENTRELINHAS E FREQUÊNCIAS</span></h2><p>Histórias para ler.<br>Histórias para ouvir.</p><nav aria-label="Links do rodapé"><a href="produtos.html?categoria=livros">Livros</a><a href="produtos.html?categoria=musica">Música</a><a href="sobre.html">Ajuda e contato</a></nav><small>© 2026 Vanta. Projeto acadêmico.</small></div>`;
  Cart.updateBadge();
}
function card(p) {
  return `<article class="product-card"><a class="product-picture" href="produto.html?id=${p.id}"><img src="${img(p.imagem)}" alt="${esc(p.nome)}" loading="lazy" width="270" height="221"></a><div class="card-meta">${p.formato}</div><h3><a href="produto.html?id=${p.id}">${esc(p.nome)}</a></h3><p class="author">${esc(p.autor)}</p><div class="card-bottom"><strong>${money(p.preco)}</strong><button class="add" data-add="${p.id}" aria-label="Adicionar ${esc(p.nome)} ao carrinho">+</button></div></article>`;
}
function section(title, sub, ids, cat) {return `<section class="product-section"><div class="section-heading"><div><h2>${title}</h2><p>${sub}</p></div><a href="produtos.html?categoria=${cat}">Ver coleção →</a></div><div class="product-grid">${ids.map(id=>card(PRODUTOS.find(p=>p.id===id))).join('')}</div></section>`;}
function home() {
 main.innerHTML = `<section class="hero"><div class="hero-copy"><h1><span>UMA LOJA, INFINITAS</span>HISTÓRIAS.</h1><p>Das páginas às faixas que marcam a vida.<br>Descubra sua próxima obsessão cultural.</p><a class="btn light" href="produtos.html?ofertas=1">Explorar ofertas →</a></div><img class="hero-art" src="${img('08bde.png')}" alt="Disco de MF DOOM e Memórias do Subsolo"></section><section class="benefits" aria-label="Benefícios"><span>✦ <small>CURADORIA INDEPENDENTE</small></span><span>↗ <small>ENVIAMOS PARA TODO O BRASIL</small></span><span>♡ <small>CULTURA DE VERDADE</small></span><span>◉ <small>PAGUE COM PIX OU CARTÃO</small></span></section>${section('Os livros que todo mundo está lendo','Novas perspectivas a cada página.',['biblioteca','verity','jogos-vorazes','jantar-secreto'],'livros')}${section('Álbuns para ouvir sem pular faixa','Da agulha ao coração: descubra nossa curadoria.',['igor','graduation','castelos','racionais'],'musica')}<section class="campaigns"><a href="produtos.html?categoria=musica" class="campaign record"><small>ESPECIAL ANALÓGICO</small><h2>O som tem<br>memória.</h2><p>Vinis, clássicos e novas descobertas.</p><span>EXPLORAR DISCOS ↗</span><img src="${img('95775.png')}" alt="Disco de vinil ilustrado" loading="lazy"></a><a class="campaign books" href="produtos.html?categoria=livros"><small>UM CAPÍTULO POR VEZ</small><h2>Leia além<br>do óbvio.</h2><p>Ficção, clássicos e vozes que importam.</p><span>DESCOBRIR LIVROS ↗</span><div class="book-stack" aria-hidden="true"><i></i><i></i><i></i><i></i></div></a></section><section class="editorial"><a href="produtos.html?categoria=livros" class="editorial-tile olive"><small>01 / LITERATURA</small><h2>Mundos que<br>cabem em você</h2><small>FICÇÃO • ROMANCE • FANTASIA</small></a><a href="produtos.html?categoria=musica" class="editorial-tile terra"><small>02 / MÚSICA</small><h2>A arte de<br>escutar</h2><small>ROCK • INDIE • MPB • JAZZ</small></a><div class="newsletter"><small>NOSSA NEWSLETTER</small><h2>Um pouco de cultura<br>direto no seu e-mail.</h2><p>Novidades, promoções e achados da semana.</p><form id="newsletter"><label for="newsletter-email" class="sr-only">Seu e-mail</label><input type="email" id="newsletter-email" required placeholder="seuemail@exemplo.com"><button class="btn">INSCREVER-SE ↗</button></form><small>Inscrição demonstrativa neste navegador.</small></div></section>`;
 $('#newsletter').onsubmit = e => {e.preventDefault(); if(Storage.write('vanta_newsletter', $('#newsletter-email').value.trim())) {toast('Inscrição demonstrativa registrada neste navegador.'); e.target.reset();}};
}
function catalog(isFavorites = false) {
 const cat = params.get('categoria') || '', query = params.get('q') || '', offers = params.has('ofertas');
 const titles = {livros:'Livros que te prendem.',musica:'Músicas para eternizar.',colecoes:'Feitos para colecionar.'};
 main.innerHTML = `<div class="page-heading"><h1>${isFavorites?'Seus favoritos.':query?'Suas descobertas.':offers?'Achados da curadoria.':titles[cat]||'Livros, discos e descobertas.'}</h1><p>${isFavorites?'Suas próximas histórias, guardadas em um só lugar.':query?'Resultados para “'+esc(query)+'”':cat==='musica'?'Vinis, CDs e edições que merecem espaço na sua coleção.':cat==='colecoes'?'Coleções especiais por um preço especial.':'Narrativas para descobrir, revisitar e compartilhar.'}</p>${offers?'<p>Seleção da loja. Os valores exibidos são os preços finais, sem desconto adicional.</p>':''}</div><div class="catalog-layout"><aside class="filters"><h2>FILTRAR POR</h2><label for="categoria">Categoria</label><select id="categoria"><option value="">Todas</option><option value="livros">Livros</option><option value="colecoes">Coleções</option><option value="musica">Música</option></select><label for="genero">Gênero</label><select id="genero"><option value="">Todos os gêneros</option>${[...new Set(PRODUTOS.map(p=>p.genero))].map(g=>`<option>${g}</option>`).join('')}</select><label for="preco">Preço máximo: <output id="preco-valor">R$ 1.700</output></label><input id="preco" type="range" min="0" max="1700" value="1700" step="10"><label for="ordem">Ordenar</label><select id="ordem"><option value="popular">Mais populares</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option><option value="nome">Nome A–Z</option></select><button class="text-btn" id="limpar">Limpar filtros</button></aside><section aria-label="Resultados"><p id="result-count" role="status"></p><div class="product-grid catalog-grid" id="results"></div></section></div>`;
 $('#categoria').value = cat;
 const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const render = () => {
  let list = PRODUTOS.filter(p=>(!$('#categoria').value||p.categoria===$('#categoria').value)&&(!$('#genero').value||p.genero===$('#genero').value)&&p.preco<=Number($('#preco').value)*100&&normalize(p.nome+' '+p.autor).includes(normalize(query))&&(!isFavorites||favorites().includes(p.id))&&(!offers||['biblioteca','verity','igor','graduation','jogos-vorazes','jantar-secreto','castelos','racionais'].includes(p.id)));
  if ($('#ordem').value==='menor') list.sort((a,b)=>a.preco-b.preco);
  if ($('#ordem').value==='maior') list.sort((a,b)=>b.preco-a.preco);
  if ($('#ordem').value==='nome') list.sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));
  $('#preco-valor').textContent=money(Number($('#preco').value)*100);
  $('#result-count').textContent = `${list.length} ${list.length===1?'resultado':'resultados'}`;
  $('#results').innerHTML=list.length?list.map(card).join(''):`<div class="empty"><h2>${isFavorites?'Sua coleção de favoritos começa aqui.':'Nenhum produto encontrado.'}</h2><p>${isFavorites?'Use o coração na página de um produto para guardá-lo.':'Tente outra busca ou ajuste os filtros.'}</p><a class="btn" href="produtos.html">Explorar a loja →</a></div>`;
 };
 main.querySelectorAll('select,input[type=range]').forEach(el=>el.addEventListener('input',render));
 $('#limpar').onclick=()=>{$('#categoria').value='';$('#genero').value='';$('#preco').value='1700';$('#ordem').value='popular';render();};render();
}
function product() {
 const p = PRODUTOS.find(p=>p.id===params.get('id'));
 if(!p){main.innerHTML='<div class="empty"><h1>Produto não encontrado.</h1><a class="btn" href="produtos.html">Voltar ao catálogo</a></div>';return;}
 document.title=p.nome+' | Vanta';
 main.innerHTML=`<nav class="breadcrumb" aria-label="Localização"><a href="index.html">Início</a> / <a href="produtos.html?categoria=${p.categoria}">${p.categoria==='musica'?'Música':p.categoria==='colecoes'?'Coleções':'Livros'}</a> / ${esc(p.nome)}</nav><section class="product-detail"><div><button type="button" class="gallery-main" id="abrir-foto" aria-label="Ampliar foto de ${esc(p.nome)}"><img id="gallery-image" src="${img(p.galeria[0])}" alt="${esc(p.nome)} — imagem 1"></button><p class="gallery-hint">Clique na foto para ampliar ↗</p><p id="gallery-caption" class="gallery-caption" aria-live="polite">1 / ${p.galeria.length} · ${esc(p.legendas[0])}</p><div class="thumbnails">${p.galeria.map((g,i)=>`<button data-gallery="${g}" data-index="${i+1}" aria-label="Ver imagem ${i+1}" aria-pressed="${i===0}"><img src="${img(g)}" alt="${esc(p.nome)}, miniatura ${i+1}"></button>`).join('')}</div></div><div class="product-info"><small class="eyebrow">${p.formato} · ${p.genero.toUpperCase()}</small><h1>${esc(p.nome)}</h1><p>Por ${esc(p.autor)}</p><p class="stock">Em estoque · Envio em até 2 dias úteis</p><strong class="price">${money(p.preco)}</strong><label for="quantidade">Quantidade</label><div class="buy-line"><div class="qty"><button id="menos" aria-label="Diminuir quantidade">−</button><input id="quantidade" type="number" min="1" max="99" value="1"><button id="mais" aria-label="Aumentar quantidade">+</button></div><button class="btn" id="comprar">Adicionar ao carrinho →</button></div><button class="text-btn" id="favorite" aria-pressed="${favorites().includes(p.id)}">${favorites().includes(p.id)?'♥ Salvo nos favoritos':'♡ Salvar nos favoritos'}</button><div class="product-about"><h2>Sobre este produto</h2><p>${esc(p.descricao)}</p>${p.id==='biblioteca'?'<p>Editora: Bertrand Brasil · 308 páginas</p>':''}<p>✓ Produto selecionado por nossa curadoria</p></div></div></section>${section('Você também pode gostar','Mais descobertas da nossa curadoria',(p.id==='biblioteca'?['conto-aia','vantagens','amanhecer','donnie-darko']:PRODUTOS.filter(x=>x.categoria===p.categoria&&x.id!==p.id).slice(0,4).map(x=>x.id)),p.categoria)}`;
 // A foto ampliada sempre acompanha o produto e a miniatura selecionados.
 const photoDialog = document.createElement('dialog');
 photoDialog.className = 'photo-dialog';
 photoDialog.setAttribute('aria-labelledby','photo-dialog-title');
 photoDialog.innerHTML = `<button type="button" class="fechar-foto" aria-label="Fechar foto ampliada">×</button><h2 id="photo-dialog-title">${esc(p.nome)}</h2><img class="photo-large" src="${img(p.galeria[0])}" alt="${esc(p.nome)}"><p>Imagem do produto · Vanta</p>`;
 main.appendChild(photoDialog);
 $('#abrir-foto').addEventListener('click', () => {
   const current = $('#gallery-image');
   photoDialog.querySelector('.photo-large').src = current.getAttribute('src');
   photoDialog.querySelector('.photo-large').alt = current.alt;
   photoDialog.querySelector('p').textContent = $('#gallery-caption').textContent;
   photoDialog.showModal();
 });
 photoDialog.querySelector('.fechar-foto').addEventListener('click', () => photoDialog.close());
 photoDialog.addEventListener('click', event => {
   if(event.target !== photoDialog) return;
   const box = photoDialog.getBoundingClientRect();
   if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) photoDialog.close();
 });
 main.querySelectorAll('[data-gallery]').forEach(button=>button.onclick=()=>{$('#gallery-image').src=img(button.dataset.gallery);$('#gallery-image').alt=p.nome+' — '+p.legendas[Number(button.dataset.index)-1];$('#gallery-caption').textContent=button.dataset.index+' / '+p.galeria.length+' · '+p.legendas[Number(button.dataset.index)-1];main.querySelectorAll('[data-gallery]').forEach(b=>b.setAttribute('aria-pressed',b===button));});
 const adjust=delta=>{$('#quantidade').value=Math.max(1,Math.min(99,(Number($('#quantidade').value)||1)+delta));};
 $('#menos').onclick=()=>adjust(-1);$('#mais').onclick=()=>adjust(1);$('#quantidade').onchange=()=>adjust(0);
 $('#comprar').onclick=()=>{if(Cart.add(p.id,$('#quantidade').value)) $('#aviso').showModal();};
 $('#favorite').onclick=()=>{const ids=favorites(),next=ids.includes(p.id)?ids.filter(id=>id!==p.id):[...ids,p.id];if(saveFavorites(next))refreshFavorites();};
}
function summary(button = true) {return `<aside class="summary"><h2>Seu pedido</h2><div class="summary-lines">${Cart.items().map(i=>`<div class="summary-product"><img src="${img(i.produto.imagem)}" alt="${esc(i.produto.nome)}"><div><strong>${esc(i.produto.nome)}</strong><small>${i.quantidade} × ${money(i.produto.preco)}</small><span>${money(i.produto.preco*i.quantidade)}</span></div></div>`).join('')}</div><p class="between"><span>Subtotal</span><strong>${money(Cart.total())}</strong></p><p class="between"><span>Entrega</span><strong>${Cart.shipping()?money(Cart.shipping()):'Grátis'}</strong></p><p class="between total"><span>Total</span><strong>${money(Cart.total()+Cart.shipping())}</strong></p>${button?'<a class="btn" href="checkout.html">Finalizar compra →</a>':'<button class="btn" form="checkout-form" type="submit">Confirmar pedido →</button>'}<small class="simulation">${button?'Frete demonstrativo: R$ 14,90. Grátis acima de R$ 199.':'Compra acadêmica simulada. Nenhum pagamento será cobrado.'}</small></aside>`;}
function cart() {
 const items = Cart.items();
 main.innerHTML=`<div class="page-heading"><h1>Seu carrinho</h1><p>${Cart.count()} ${Cart.count()===1?'item selecionado':'itens selecionados'}</p></div>${items.length?`<div class="cart-layout"><section aria-label="Itens do carrinho">${items.map(i=>`<article class="cart-item"><a href="produto.html?id=${i.produto.id}"><img src="${img(i.produto.imagem)}" alt="${esc(i.produto.nome)}"></a><div><h2><a href="produto.html?id=${i.produto.id}">${esc(i.produto.nome)}</a></h2><p>${esc(i.produto.autor)}</p><p>${money(i.produto.preco)} / unidade</p><button class="text-btn" data-remove="${i.produto.id}">Remover</button></div><div class="cart-quantity"><div class="qty"><button data-change="${i.produto.id}" data-delta="-1" aria-label="Diminuir ${esc(i.produto.nome)}">−</button><span>${i.quantidade}</span><button data-change="${i.produto.id}" data-delta="1" aria-label="Aumentar ${esc(i.produto.nome)}" ${i.quantidade>=99?'disabled':''}>+</button></div><strong>${money(i.produto.preco*i.quantidade)}</strong></div></article>`).join('')}<a class="back" href="produtos.html">← Continuar comprando</a></section>${summary()}</div>`:`<section class="empty"><img src="${img('c82a9.png')}" alt="Livros e disco de vinil ilustrados"><h2>Seu carrinho está esperando uma boa história.</h2><p>Descubra sua próxima leitura ou seu próximo disco favorito.</p><a class="btn" href="produtos.html">Explorar a loja →</a></section>`}`;
}
function order() {
 const order = Storage.read('vanta_ultimo_pedido',null);
 main.innerHTML = order && typeof order.id==='string'?`<section class="confirmation"><div class="confirmation-seal"><img src="${img('confirmation.png')}" alt="" width="110" height="110"><span aria-label="Confirmado">✓</span></div><h1>Seu pedido foi confirmado!</h1><p>Obrigado por apoiar histórias que merecem ser contadas.</p><p>Pedido <strong>${esc(order.id)}</strong> · ${money(order.total)}</p><p>${esc(order.pagamento)} · Simulação acadêmica concluída.</p><small>Este pedido ficou registrado apenas neste navegador. Nenhum e-mail foi enviado e não haverá cobrança ou entrega.</small><a class="btn" href="index.html">Voltar à loja →</a></section>`:'<section class="empty"><h1>Nenhum pedido realizado ainda.</h1><a class="btn" href="produtos.html">Explorar a loja</a></section>';
}
header();
if(page==='index') home();
if(page==='produtos') catalog();
if(page==='favoritos') catalog(true);
if(page==='produto') product();
if(page==='carrinho') cart();
if(page==='pedido') order();
if(page==='sobre') renderAbout();
CartNavigation.syncLinks();
document.addEventListener('click', e=>{
 const add=e.target.closest('[data-add]');if(add&&Cart.add(add.dataset.add)) $('#aviso').showModal();
 const remove=e.target.closest('[data-remove]');if(remove){Cart.set(remove.dataset.remove,0);cart();}
 const change=e.target.closest('[data-change]');if(change){const item=Cart.items().find(i=>i.produto.id===change.dataset.change);Cart.set(item.produto.id,item.quantidade+Number(change.dataset.delta));cart();const next=main.querySelector(`[data-change="${change.dataset.change}"][data-delta="${change.dataset.delta}"]`);next?.focus();}
 if(e.target.closest('.fechar,.fechar-aviso')) $('#aviso').close();
});
$('#aviso').addEventListener('click',e=>{if(e.target===$('#aviso')) {const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
window.addEventListener('storage',()=>{refreshFavorites();Cart.updateBadge();if(page==='carrinho')cart();if(page==='checkout'&&typeof renderCheckout==='function')renderCheckout();});
// Voltar/avançar pode restaurar o HTML antigo pelo cache do navegador.
window.addEventListener('pageshow',()=>{refreshFavorites();Cart.updateBadge();if(page==='carrinho')cart();if(page==='checkout'&&typeof renderCheckout==='function')renderCheckout();});
