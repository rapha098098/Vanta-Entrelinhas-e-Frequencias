/* Persistência defensiva: dados locais podem estar ausentes ou corrompidos. */
const Storage = {
  read(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } },
  write(key, value, silent = false) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { if (!silent && typeof toast === 'function') toast('O navegador não permitiu salvar os dados.'); return false; } }
};
// Em file://, cada HTML pode ter seu próprio localStorage. Somente os IDs e
// quantidades do carrinho acompanham os links; contas e dados pessoais não.
const CartNavigation = {
  enabled: typeof location !== 'undefined' && location.protocol === 'file:',
  parameter: 'vanta_cart',
  favoriteParameter: 'vanta_favs',
  raw: [],
  favoriteRaw: [],
  init() {
    if (!this.enabled) return;
    this.raw = Storage.read('vanta_carrinho', []);
    const value = new URL(location.href).searchParams.get(this.parameter);
    if (value !== null) {
      try { this.raw = value.length <= 6000 ? JSON.parse(value) : []; }
      catch { this.raw = []; }
    }
    this.favoriteRaw = Storage.read('vanta_favoritos', []);
    const favs = new URL(location.href).searchParams.get(this.favoriteParameter);
    if (favs !== null) {
      try { this.favoriteRaw = favs.length <= 3000 ? JSON.parse(favs) : []; }
      catch { this.favoriteRaw = []; }
    }
  },
  favoriteIds() {
    return Array.isArray(this.favoriteRaw) ? [...new Set(this.favoriteRaw.filter(id => PRODUTOS.some(p => p.id === id)))] : [];
  },
  href(href) {
    if (!this.enabled || !href || href.startsWith('#')) return href;
    try {
      const current = new URL(location.href), target = new URL(href, current);
      const folder = current.pathname.slice(0, current.pathname.lastIndexOf('/') + 1);
      if (target.protocol !== 'file:' || target.pathname.slice(0, target.pathname.lastIndexOf('/') + 1) !== folder || !target.pathname.endsWith('.html')) return href;
      target.searchParams.set(this.parameter, JSON.stringify(Cart.snapshot()));
      target.searchParams.set(this.favoriteParameter, JSON.stringify(this.favoriteIds()));
      return target.href;
    } catch { return href; }
  },
  syncLinks() {
    if (!this.enabled) return;
    document.querySelectorAll('a[href]').forEach(link => {
      link.setAttribute('href', this.href(link.getAttribute('href')));
    });
  },
  persist() {
    if (!this.enabled) return;
    try { history.replaceState(null, '', this.href(location.href)); } catch { /* Os links ainda transportam os itens. */ }
    this.syncLinks();
  },
  attach() {
    if (!this.enabled) return;
    const carry = event => {
      const link = event.target.closest?.('a[href]');
      if (link) link.setAttribute('href', this.href(link.getAttribute('href')));
    };
    // Inclui links recriados por filtros e abertura em outra aba.
    ['click','auxclick','contextmenu'].forEach(type => document.addEventListener(type, carry, true));
    document.addEventListener('submit', event => {
      const form = event.target;
      if (!form.hasAttribute('action') || form.method.toLowerCase() !== 'get') return;
      if (this.href(form.getAttribute('action')) === form.getAttribute('action')) return;
      for (const [name,value] of [[this.parameter,Cart.snapshot()],[this.favoriteParameter,this.favoriteIds()]]) {
        let input = form.querySelector(`input[name="${name}"]`);
        if (!input) { input = document.createElement('input'); input.type = 'hidden'; input.name = name; form.appendChild(input); }
        input.value = JSON.stringify(value);
      }
    }, true);
  }
};
CartNavigation.init();
const Cart = {
  key: 'vanta_carrinho',
  items() {
    const raw = CartNavigation.enabled ? CartNavigation.raw : Storage.read(this.key, []);
    if (!Array.isArray(raw)) return [];
    return PRODUTOS.filter(p => raw.some(i => i && i.id === p.id)).map(p => {
      const qty = raw.filter(i => i && i.id === p.id).reduce((sum, i) => sum + (Number.isInteger(i.quantidade) ? Math.max(0, i.quantidade) : 0), 0);
      return {produto:p, quantidade:Math.min(99, qty)};
    }).filter(i => i.quantidade > 0);
  },
  snapshot() { return this.items().map(i => ({id:i.produto.id, quantidade:i.quantidade})); },
  href(href) { return CartNavigation.href(href); },
  save(items) {
    const raw = items.map(i => ({id:i.produto.id, quantidade:i.quantidade}));
    const saved = Storage.write(this.key, raw, CartNavigation.enabled);
    if (CartNavigation.enabled) { CartNavigation.raw = raw; CartNavigation.persist(); return true; }
    return saved;
  },
  add(id, quantidade = 1) {
    const produto = PRODUTOS.find(p => p.id === id);
    if (!produto) return false;
    const items = this.items(), item = items.find(i => i.produto.id === id);
    quantidade = Math.max(1, Math.min(99, Math.floor(Number(quantidade) || 1)));
    if (item) item.quantidade = Math.min(99, item.quantidade + quantidade);
    else items.push({produto, quantidade});
    const saved = this.save(items); this.updateBadge(); return saved;
  },
  set(id, quantidade) {
    const items = this.items();
    const item = items.find(i => i.produto.id === id);
    if (item) item.quantidade = Math.max(0, Math.min(99, Math.floor(Number(quantidade) || 0)));
    this.save(items.filter(i => i.quantidade)); this.updateBadge();
  },
  total() { return this.items().reduce((sum, i) => sum + i.produto.preco * i.quantidade, 0); },
  count() { return this.items().reduce((sum, i) => sum + i.quantidade, 0); },
  shipping() { return this.total() >= 19900 || !this.count() ? 0 : 1490; },
  updateBadge() { document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = this.count()); }
};
if (CartNavigation.enabled) { Cart.save(Cart.items()); CartNavigation.attach(); }
