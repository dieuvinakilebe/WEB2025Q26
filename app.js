const prods=[{id:'p1',title:'Товар 1',price:1000},{id:'p2',title:'Товар 2',price:2000},{id:'p3',title:'Товар 3',price:3000}]
const cat=document.getElementById('catalog')
const cnt=document.getElementById('cart-count')
const tot=document.getElementById('cart-total')
const list=document.getElementById('cart-list')
const atot=document.getElementById('aside-total')
const m='₽'
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
const cart={}
function add(id){cart[id]=(cart[id]||0)+1;rCart()}
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
rCart()
