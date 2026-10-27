/* Reproduz arquivos HTML com armazenamentos separados, como pode ocorrer em file://. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');let checks=0;
function page(href, saved=new Map(), blocked=false) {
  const location={href,protocol:new URL(href).protocol};
  const handlers={};
  const context={URL,URLSearchParams,location,console,
    localStorage:{getItem:key=>{if(blocked)throw Error('Storage blocked');return saved.get(key)||null;},setItem:(key,value)=>{if(blocked)throw Error('Storage blocked');saved.set(key,value);}},
    history:{replaceState(_state,_title,url){location.href=url;}},
    document:{querySelectorAll:()=>[],createElement:()=>({}),addEventListener(type,fn){handlers[type]=fn;}}
  };
  vm.createContext(context);
  for(const file of ['produtos.js','carrinho.js'])vm.runInContext(fs.readFileSync(path.join(root,'js',file),'utf8'),context);
  return {run:code=>vm.runInContext(code,context),location,saved,handlers};
}
function equal(actual,expected,message){assert.equal(actual,expected,message);checks++;}
const home=page('file:///loja/index.html');
equal(home.run("Cart.add('biblioteca',2)"),true,'Adição na página inicial');
home.run("Cart.add('igor')");
const cartUrl=home.run("Cart.href('carrinho.html')");
const cart=page(cartUrl);
equal(cart.run('Cart.count()'),3,'Carrinho recebe itens de outro HTML com storage separado');
equal(cart.run('Cart.total()'),29970,'Preços vêm do catálogo e total é preservado');
cart.run("Cart.set('biblioteca',4); Cart.set('igor',0)");
const productUrl=cart.run("Cart.href('produto.html?id=verity#fotos')");
equal(new URL(productUrl).searchParams.get('id'),'verity','Parâmetro do produto preservado');
equal(new URL(productUrl).hash,'#fotos','Âncora preservada');
const detail=page(productUrl);
equal(detail.run('Cart.count()'),4,'Alteração e remoção sobrevivem à próxima navegação');
const reload=page(detail.location.href);
equal(reload.run('Cart.count()'),4,'Recarregamento conserva o snapshot atual');
detail.run('Cart.save([])');
const stale=new Map([['vanta_carrinho',JSON.stringify([{id:'igor',quantidade:8}])]]);
const empty=page(detail.run("Cart.href('carrinho.html')"),stale);
equal(empty.run('Cart.count()'),0,'Carrinho vazio sobrescreve dados antigos da página de destino');
const blocked=page('file:///loja/index.html',new Map(),true);
equal(blocked.run("Cart.add('verity',2)"),true,'Modo local continua navegável mesmo com storage bloqueado');
equal(page(blocked.run("Cart.href('carrinho.html')"),new Map(),true).run('Cart.count()'),2,'Itens chegam à outra página com storage bloqueado');
equal(home.run("Cart.href('https://exemplo.com/')"),'https://exemplo.com/','Não envia o carrinho para sites externos');
equal(home.run("Cart.href('../outra-loja/index.html')"),'../outra-loja/index.html','Não envia o carrinho para outra pasta');
equal(home.run("Cart.href('#contato')"),'#contato','Âncoras locais permanecem simples');
const invalid=page('file:///loja/carrinho.html?vanta_cart=JSONinvalido');
equal(invalid.run('Cart.count()'),0,'Snapshot inválido não interrompe a página');
const crafted=page('file:///loja/carrinho.html?vanta_cart='+encodeURIComponent(JSON.stringify([{id:'nao-existe',quantidade:5},{id:'verity',quantidade:999}])));
equal(crafted.run('Cart.count()'),99,'IDs desconhecidos ignorados e quantidade limitada');
const shared=new Map(),httpHome=page('http://localhost:5500/index.html',shared);
httpHome.run("Cart.add('biblioteca')");
equal(httpHome.run("Cart.href('carrinho.html')"),'carrinho.html','Servidor local mantém URLs normais');
equal(page('http://localhost:5500/carrinho.html',shared).run('Cart.count()'),1,'HTTP compartilha o armazenamento entre as páginas');
// O formulário de busca também precisa carregar o carrinho no modo arquivo.
const inputs=[];
home.handlers.submit({target:{method:'get',hasAttribute:name=>name==='action',getAttribute:()=> 'produtos.html',querySelector:()=>null,appendChild:input=>inputs.push(input)}});
equal(inputs[0].type,'hidden','Busca recebe um campo oculto com o carrinho');
equal(page('file:///loja/produtos.html?q=livro&vanta_cart='+encodeURIComponent(inputs[0].value)).run('Cart.count()'),3,'Busca preserva os itens ao abrir o catálogo');
let linkHref='carrinho.html';
home.handlers.click({target:{closest:()=>({getAttribute:()=>linkHref,setAttribute:(_name,value)=>{linkHref=value;}})}});
equal(page(linkHref).run('Cart.count()'),3,'Link recriado dinamicamente recebe os itens antes da navegação');
console.log(`${checks} verificações de persistência e navegação passaram.`);
