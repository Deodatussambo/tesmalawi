
// Shared interactions for the demonstration website.
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
if(toggle && nav){ toggle.addEventListener('click',()=>nav.classList.toggle('open')); }

let cart = Number(localStorage.getItem('demoCartCount') || 0);
function updateCart(){
  document.querySelectorAll('.cart-count').forEach(el=>el.textContent=cart);
}
updateCart();
document.querySelectorAll('[data-add-cart]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    cart++; localStorage.setItem('demoCartCount',cart); updateCart();
    const old=btn.textContent; btn.textContent='Added ✓';
    setTimeout(()=>btn.textContent=old,1200);
  });
});
const search = document.querySelector('#productSearch');
const category = document.querySelector('#categoryFilter');
function filterProducts(){
  const q=(search?.value || '').toLowerCase();
  const c=(category?.value || 'all').toLowerCase();
  document.querySelectorAll('.product-card[data-name]').forEach(card=>{
    const matchName=card.dataset.name.toLowerCase().includes(q);
    const matchCat=c==='all'||card.dataset.category.toLowerCase()===c;
    card.style.display=matchName&&matchCat?'':'none';
  });
}
if(search) search.addEventListener('input',filterProducts);
if(category) category.addEventListener('change',filterProducts);
document.querySelectorAll('form[data-demo-form]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const msg=form.querySelector('.form-message');
    if(msg) msg.textContent='Thank you. This is a front-end demo; connect the form to an email service or backend before launch.';
    form.reset();
  });
});
