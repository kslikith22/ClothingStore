let basket = JSON.parse(localStorage.getItem("data"));
let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=>x+y,0);
};
calculation();
let generateitems =()=> {
    let shoppingcart = document.getElementById("shopping-cart")
    if(basket.length !== 0) {
        
        return (shoppingcart.innerHTML = basket.map((x)=>{
            let {id,item} = x
            let search = shopitems.find((y)=>y.id ===id) // finding matching id's details y.id === x.id
            return ` 
            <div class="cart-item">
                <img src=${search.image} width=200 alt="logo">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="h4">
                        <p>${search.name}</p>
                        <p>$${search.price}</p>
                        <i onclick="removeitem(${id})" class="bi bi-x-lg"></i>
                        </h4>
                    </div>
                    <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item === undefined ? 0 :  item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$ ${item * search.price}</h3>
                </div>    
            </div>    `
        }).join(""))

        
    }else{
        return shoppingcart.innerHTML = `
        <div>
            <h2>Cart is empty</h2>
            <a href="index.html"><button class="btn btn-warning">Back to home</button><a>
        <div>
        
        `
    }

}
generateitems();

let increment = (id)=> {
    let search = basket.find((x)=> x.id === id)
    
    if(search === undefined) {
        basket.push( {
        
            id : id,
            item:1
        })
    }
    else{
        search.item +=1;
    }
    
    update(id);
    generateitems();
    localStorage.setItem("data",JSON.stringify(basket))
    console.log(basket)
};
let decrement = (id)=> {
let search = basket.find((x)=> x.id= id)
if(search === undefined) return ;
else if(search.item === 0) return;
else {
    search.item -= 1;
}
update(id);
basket = basket.filter((x)=>x.item !== 0);
generateitems();
localStorage.setItem("data",JSON.stringify(basket));
}
let update = (id)=> {
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalamount()
}
let removeitem  =(id) =>{   
    console.log(id)
    basket = basket.filter((x)=>x.id !== id) // removes the selected id(details in cart) and filters the non-selected one
    localStorage.setItem("data",JSON.stringify(basket))
    generateitems()
    calculation();
    totalamount()
}
let totalamount =()=> {
    let label = document.getElementById("label")
    if(basket.length!== 0) {
        let amount = basket.map((x)=> {
            let {item,id} =x;
            let search  = shopitems.find((y)=> y.id === id)|| [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
         label.innerHTML = `
         <div>
                <h3>Price $ ${amount}</h3>
                <button class="btn btn-primary">Checkout</button>
                <button onclick="clearcart()" class="btn btn-danger">Clear cart</button>
         </div>
         
         `
    }
}
totalamount()

let clearcart = () =>{
    basket = []
    generateitems();
    localStorage.setItem("data",JSON.stringify(basket))
    
}
