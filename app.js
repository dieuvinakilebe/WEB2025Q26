const PRODUCTS = [
  {id:'p1', title:'Товар 1', price:1000},
  {id:'p2', title:'Товар 2', price:2000},
  {id:'p3', title:'Товар 3', price:3000},
];
const catalog = document.getElementById('catalog');

function renderCatalog(){
  catalog.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <h3>${p.title}</h3>
      <div>${p.price} ₽</div>
      <button data-id="${p.id}">Добавить в корзину</button>
    `;
    catalog.appendChild(el);
  });
}
renderCatalog();
