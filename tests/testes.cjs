/* Testes opcionais: node tests/testes.cjs. O site não depende do Node. */
const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');const {webcrypto}=require('node:crypto');const path=require('node:path');
const root=path.resolve(__dirname,'..');let checks=0;
const ok=(value,message)=>{assert.ok(value,message);checks++;};
const files=new Map();const localStorage={getItem:key=>files.get(key)||null,setItem:(key,value)=>files.set(key,value)};
const ctx={localStorage,document:{querySelectorAll:()=>[]},crypto:webcrypto,TextEncoder,Uint8Array,console};vm.createContext(ctx);
for(const f of ['produtos.js','carrinho.js'])vm.runInContext(fs.readFileSync(path.join(root,'js',f),'utf8'),ctx);
const run=code=>vm.runInContext(code,ctx);
ok(run('PRODUTOS.length===29'),'Catálogo possui os 29 produtos');
ok(run('new Set(PRODUTOS.map(p=>p.id)).size===PRODUTOS.length'),'IDs únicos');
ok(run('new Set(PRODUTOS.map(p=>p.imagem)).size===PRODUTOS.length'),'Imagens principais exclusivas');
const {createHash}=require('node:crypto');
const photos=run('PRODUTOS').map(p=>({produto:p,path:path.join(root,'assets/imagens',p.imagem)}));
ok(new Set(photos.map(photo=>createHash('sha256').update(fs.readFileSync(photo.path)).digest('hex'))).size===photos.length,'Nenhuma foto principal idêntica em produtos diferentes');
for(const photo of photos) {
 ok(photo.produto.imagem.startsWith('produtos/'+photo.produto.id+'/'),'Pasta da foto pertence ao produto');
 ok(photo.produto.galeria.every(file=>file.startsWith('produtos/'+photo.produto.id+'/')),'Galeria pertence ao produto correto');
 ok(photo.produto.galeria.length===4,'Todos os produtos têm exatamente quatro imagens');
 ok(new Set(photo.produto.galeria).size===4,'Quatro arquivos diferentes na galeria');
 ok(new Set(photo.produto.galeria.map(file=>createHash('sha256').update(fs.readFileSync(path.join(root,'assets/imagens',file))).digest('hex'))).size===4,'Quatro imagens de conteúdo distinto');
 ok(photo.produto.legendas.length===4,'Cada imagem tem sua própria legenda');
}

run("Cart.add('biblioteca',2)");ok(run('Cart.total()===10980&&Cart.count()===2&&Cart.shipping()===1490'),'Subtotal e frete de duas unidades');
run("Cart.add('igor')");ok(run('Cart.total()===29970&&Cart.count()===3&&Cart.shipping()===0'),'Dois produtos e frete gratuito');
run("Cart.set('biblioteca',1)");ok(run('Cart.total()===24480'),'Reduzir quantidade');
run("Cart.set('igor',0)");ok(run('Cart.total()===5490&&Cart.count()===1'),'Remover produto');
ok(JSON.parse(files.get('vanta_carrinho'))[0].quantidade===1,'Carrinho serializado em JSON');
run("Cart.set('biblioteca',999)");ok(run('Cart.count()===99'),'Quantidade máxima');
run("Cart.set('biblioteca',-1)");ok(run('Cart.count()===0&&Cart.total()===0&&Cart.shipping()===0'),'Carrinho vazio');
files.set('vanta_carrinho','json inválido');ok(run('Cart.count()===0'),'JSON corrompido tratado');
files.set('vanta_carrinho','{"id":"invalido"}');ok(run('Cart.count()===0'),'Formato inválido tratado');
files.set('vanta_carrinho',JSON.stringify([{id:'inexistente',quantidade:4},{id:'biblioteca',quantidade:2},{id:'biblioteca',quantidade:3}]));ok(run('Cart.count()===5&&Cart.total()===27450'),'ID inválido ignorado e duplicatas normalizadas');
for(let total=1;total<20000;total+=137){for(let count=1;count<=12;count++){const parcela=Math.floor(total/count),resto=total-parcela*count;assert.equal((parcela+resto)+parcela*(count-1),total);}}checks++; // Todas as divisões voltam ao total em centavos.
// Fluxos locais de cadastro e login com DOM de formulário simulado.
const error={textContent:''},submit={disabled:false},elements={nome:{value:'Pessoa Teste'},email:{value:'teste@example.com'},senha:{value:webcrypto.randomUUID()},confirmar:{value:'',setCustomValidity(text){this.invalid=text;}}};elements.confirmar.value=elements.senha.value;
const form={elements,reportValidity:()=>!elements.confirmar.invalid,querySelector:()=>submit};const main={innerHTML:''};const loc={href:''};let mode='cadastro';
Object.assign(ctx,{main,location:loc,esc:s=>s,img:s=>s,$:selector=>selector==='#auth-form'?form:selector==='#auth-error'?error:null});
run("let page='cadastro';");
vm.runInContext(fs.readFileSync(path.join(root,'js/autenticacao.js'),'utf8'),ctx);
(async()=>{
 await form.onsubmit({preventDefault(){}});ok(loc.href==='index.html','Cadastro conclui e redireciona');
 const stored=JSON.parse(files.get('vanta_contas'));ok(stored.length===1&&stored[0].hash.length===64&&!stored[0].senha,'Verificador salvo sem senha em texto');
 files.set('vanta_sessao','null');loc.href='';run("page='login';auth();");await form.onsubmit({preventDefault(){}});ok(loc.href==='index.html','Login correto conclui');
 files.set('vanta_sessao','null');loc.href='';elements.senha.value=webcrypto.randomUUID();run('auth();');await form.onsubmit({preventDefault(){}});ok(!loc.href&&error.textContent.includes('incorretos'),'Senha incorreta é rejeitada');
 files.set('vanta_sessao','null');loc.href='';run("page='cadastro';auth();");elements.confirmar.value=elements.senha.value;await form.onsubmit({preventDefault(){}});ok(error.textContent.includes('já está cadastrado'),'E-mail duplicado é rejeitado');
 elements.email.value='outro@example.com';elements.confirmar.value=webcrypto.randomUUID();await form.onsubmit({preventDefault(){}});ok(!!elements.confirmar.invalid,'Confirmação diferente é rejeitada');
 // Integridade: todos os recursos de produtos e referências locais estão presentes.
 const products=run('PRODUTOS');for(const p of products)for(const image of [p.imagem,...p.galeria])ok(fs.statSync(path.join(root,'assets/imagens',image)).size>0,'Recurso '+image);
 for(const f of fs.readdirSync(path.join(root,'js')).filter(f=>f.endsWith('.js')))new vm.Script(fs.readFileSync(path.join(root,'js',f),'utf8'));
 console.log(`${checks} verificações passaram. Carrinho, parcelas, contas locais, integridade e sintaxe.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
