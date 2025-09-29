const prods=[{id:'p1',title:'Товар 1',price:1000},{id:'p2',title:'Товар 2',price:2000},{id:'p3',title:'Товар 3',price:3000}]
const cat=document.getElementById('catalog')
const cnt=document.getElementById('cart-count')
const tot=document.getElementById('cart-total')
const list=document.getElementById('cart-list')
const atot=document.getElementById('aside-total')
const clr=document.getElementById('clear-cart')
const m='₽'
const key='cart-v1'
function f(n){return new Intl.NumberFormat('ru-RU').format(n)}
function rCat(){
  cat.innerHTML=''
  prods.forEach(p=>{
    const el=document.createElement('article')
    el.className='card'
    el.innerHTML=`<h3>${p.title}</h3><div><strong>${f(p.price)} ${m}</strong></div><button data-id="${p.id}">Добавить в корзину</button>`
    cat.appendChild(el)
  })
}
rCat()
function load(){try{return JSON.parse(localStorage.getItem(key))||{}}catch{return{}}}
function save(){localStorage.setItem(key,JSON.stringify(cart))}
const cart=load()
function add(id){cart[id]=(cart[id]||0)+1;save();rCart()}
function setq(id,q){q=Math.max(1,parseInt(q||'1',10));cart[id]=q;save();rCart()}
function rem(id){delete cart[id];save();rCart()}
function clear(){Object.keys(cart).forEach(k=>delete cart[k]);save();rCart()}
function rCart(){
  let n=0,s=0
  list.innerHTML=''
  Object.entries(cart).forEach(([id,q])=>{
    const p=prods.find(x=>x.id===id); if(!p)return
    n+=q; s+=p.price*q
    const li=document.createElement('li')
    li.innerHTML=`${p.title} — ${f(p.price)} ${m} × <input type="number" min="1" value="${q}" data-id="${id}" class="q"> = ${f(p.price*q)} ${m} <button data-r="${id}">Удалить</button>`
    list.appendChild(li)
  })
  cnt.textContent=n
  tot.textContent=`${f(s)} ${m}`
  atot.textContent=`${f(s)} ${m}`
}
cat.addEventListener('click',e=>{const id=e.target.dataset.id;if(id)add(id)})
list.addEventListener('input',e=>{if(e.target.classList.contains('q'))setq(e.target.dataset.id,e.target.value)})
list.addEventListener('click',e=>{const id=e.target.dataset.r;if(id)rem(id)})
clr.addEventListener('click',clear)
const oBtn=document.getElementById('open-order')
const cBtn=document.getElementById('checkout-btn')
const oSec=document.getElementById('order')
const xBtn=document.getElementById('cancel-order')
const form=document.getElementById('order-form')
function o(){oSec.hidden=false;const a=form.querySelector('input,textarea');if(a)a.focus()}
function x(){oSec.hidden=true}
oBtn.addEventListener('click',o)
cBtn.addEventListener('click',o)
xBtn.addEventListener('click',x)
form.addEventListener('submit',e=>{
  e.preventDefault()
  if(!form.reportValidity())return
  alert('Заказ создан!')
  clear()
  form.reset()
  x()
})
rCart()
