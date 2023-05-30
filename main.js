//botones
const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const menuHamIcon = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCarritoIcon = document.querySelector('.navbar-shopping-cart');
const shoppingCardContainer = document.querySelector('#shoppingCardContainer');
const productDetailContainer = document.querySelector('#productDetail');
const productDetailCloseIcon = document.querySelector('.product-detail-close');
const cardsContainer = document.querySelector('.cards-container')

menuEmail.addEventListener('click', toggleDesktopMenu);
menuHamIcon.addEventListener('click', toggleMobileMenu);
menuCarritoIcon.addEventListener('click', toggleCarritoAside);

productDetailCloseIcon.addEventListener('click', closeProductDetailAside);

//apertura y cierre de menues
function toggleDesktopMenu(){
    desktopMenu.classList.toggle('inactive');
}
function toggleMobileMenu(){
    const isAsideClosed = shoppingCardContainer.classList.contains('inactive');

    if(!isAsideClosed){
        shoppingCardContainer.classList.add('inactive');
    }
    mobileMenu.classList.toggle('inactive');
}
function toggleCarritoAside(){
    const mobileMenuClosed = mobileMenu.classList.contains('inactive');

    if(!mobileMenuClosed){
        mobileMenu.classList.add('inactive');
    }
    shoppingCardContainer.classList.toggle('inactive');
    productDetailContainer.classList.add('inactive');
}

//apertura de product detail
function openProductDetailAside(){
    productDetailContainer.classList.remove('inactive');
}
function closeProductDetailAside(){
    productDetailContainer.classList.add('inactive');
}
//productos
const productList = [];
productList.push({
    name: 'pocoyo',
    price: 'pocoyo',
    image: 'https://i.postimg.cc/WbX9hyPd/IMG-20220507-WA0003.jpg',
    link: 'pocoyo.html'
});
productList.push({
    name: 'Elsa',
    price: 'Frozen',
    image: 'https://i.postimg.cc/4x7XqLD0/IMG-20230313-WA0002.jpg',
});
productList.push({
    name: 'Frida',
    price: 'Frida',
    image: 'https://i.postimg.cc/wxnzS5Qn/20230107-160135.jpg',
});
productList.push({
    name: 'Oso',
    price: 'Oso',
    image: 'https://i.postimg.cc/pLHRw6xb/IMG-20230107-WA0000.jpg',
});
productList.push({
    name: 'Chancho',
    price: 'Chancho',
    image: 'https://i.postimg.cc/xdsQbjmn/20230107-160812.jpg',
});
productList.push({
    name: 'Conejo',
    price: 'Conejo',
    image: 'https://i.postimg.cc/kM2JKSwZ/20230107-155805.jpg',
});

//funcion para mostrar todos los productos
function renderProducts(arr){
for(product of productList){

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.image);
    productImg.addEventListener('click', openProductDetailAside);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const productInfoDiv = document.createElement('div');
    
    const productPrice = document.createElement('p');
    productPrice.innerText = product.price;
    const productName = document.createElement('p');
    productName.innerText = product.name;

    productInfoDiv.appendChild(productPrice);
    productInfoDiv.appendChild(productName);

    const productInfoFigure = document.createElement('figure');
    const productImgCart = document.createElement('img');
    productImgCart.setAttribute('src', './icons/bt_add_to_cart.svg');
    
    productInfoFigure.appendChild(productImgCart);

    productInfo.appendChild(productInfoDiv);
    productInfo.appendChild(productInfoFigure);

    productCard.appendChild(productImg);
    productCard.appendChild(productInfo);

    cardsContainer.appendChild(productCard);
}}   
renderProducts(productList);