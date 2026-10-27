/* Demonstração local. Não representa autenticação de produção.
   A senha não é persistida: guardamos apenas um verificador SHA-256 com salt. */
async function passwordHash(password,salt) {
 const bytes = new TextEncoder().encode(salt+'|'+password);
 const hash = await crypto.subtle.digest('SHA-256',bytes);
 return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
function auth() {
 const session=Storage.read('vanta_sessao',null), signup=page==='cadastro';
 if(session?.nome) {main.innerHTML=`<section class="confirmation"><h1>Olá, ${esc(session.nome)}.</h1><p>Você está na sua conta demonstrativa neste navegador.</p><a class="btn" href="favoritos.html">Ver meus favoritos →</a><button class="text-btn" id="logout">Sair da conta</button></section>`;$('#logout').onclick=()=>{Storage.write('vanta_sessao',null);location.href='login.html';};return;}
 main.innerHTML=`<div class="auth-layout"><section class="auth-editorial"><h2>ENTRE NA SUA<br>PRÓXIMA HISTÓRIA.</h2><p>Salve favoritos, acompanhe pedidos e descubra novos autores e artistas todos os dias.</p><img src="${img('c82a9.png')}" alt="Livros e disco de vinil em uma composição editorial"><img class="editorial-signature" src="${img('7aed4.png')}" alt="Vanta — Entrelinhas e Frequências"></section><section class="panel auth-form"><h1>${signup?'Comece sua próxima história':'Bem-vindo de volta'}</h1><p>${signup?'Crie uma conta demonstrativa para continuar.':'Entre com seus dados para continuar.'}</p><form id="auth-form">${signup?'<label>Nome completo<input name="nome" autocomplete="name" minlength="3" required></label>':''}<label>E-mail<input type="email" name="email" autocomplete="email" required placeholder="seuemail@exemplo.com"></label><label>Senha<input type="password" name="senha" autocomplete="${signup?'new-password':'current-password'}" minlength="6" maxlength="128" required placeholder="Mínimo de 6 caracteres"></label>${signup?'<label>Confirmar senha<input type="password" name="confirmar" autocomplete="new-password" minlength="6" required></label>':'<button type="button" class="text-btn" id="forgot">Esqueceu a senha?</button>'}<p id="auth-error" role="alert" class="form-error"></p><button class="btn" type="submit">${signup?'Criar minha conta':'Entrar na minha conta'} →</button></form><p class="auth-switch">${signup?'Já tem conta? <a href="login.html">Entrar</a>':'Ainda não tem conta? <a href="cadastro.html">Cadastre-se</a>'}</p><small class="simulation">Acesso acadêmico local. Use dados fictícios e uma senha de teste. Os dados não são enviados a um servidor.</small></section></div>`;
 $('#forgot')?.addEventListener('click',()=>toast('Esta demonstração não envia e-mails de recuperação. Você pode criar outra conta com um e-mail de teste diferente.'));
 const form=$('#auth-form');form.onsubmit=async e=>{
  e.preventDefault();$('#auth-error').textContent='';
  const email=form.elements.email.value.trim().toLowerCase(),password=form.elements.senha.value;
  const raw=Storage.read('vanta_contas',[]),accounts=Array.isArray(raw)?raw:[];
  if(signup){
   form.elements.confirmar.setCustomValidity(password===form.elements.confirmar.value?'':'As senhas precisam ser iguais.');
   if(!form.reportValidity())return;
   if(form.elements.nome.value.trim().length<3){$('#auth-error').textContent='Informe seu nome com pelo menos 3 caracteres.';return;}
   if(accounts.some(a=>a.email===email)){$('#auth-error').textContent='Este e-mail já está cadastrado neste navegador.';return;}
  }
  const submit=form.querySelector('[type=submit]');submit.disabled=true;
  try {
   if(!crypto.subtle)throw new Error('Abra pelo Live Server para usar o cadastro local.');
   let account;
   if(signup){const salt=Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b=>b.toString(16).padStart(2,'0')).join('');account={nome:form.elements.nome.value.trim(),email,salt,hash:await passwordHash(password,salt)};if(!Storage.write('vanta_contas',[...accounts,account]))return;}
   else {account=accounts.find(a=>a.email===email);if(!account||await passwordHash(password,account.salt)!==account.hash){$('#auth-error').textContent='E-mail ou senha incorretos. Cadastre uma conta de teste se for seu primeiro acesso.';return;}}
   if(Storage.write('vanta_sessao',{nome:account.nome,email:account.email}))location.href='index.html';
  } catch(error){$('#auth-error').textContent=error.message||'Não foi possível concluir o acesso local.';}finally{submit.disabled=false;}
 };
 if(signup) form.elements.confirmar.oninput=()=>form.elements.confirmar.setCustomValidity('');
}
if(page==='login'||page==='cadastro')auth();
