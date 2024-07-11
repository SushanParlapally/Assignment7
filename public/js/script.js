let productItem=[];
let  favourites=[];

const getProducts=()=>
{
    return fetch("http://localhost:3000/products")
    .then((result)=>
    {
       if(result.status==200){
        return Promise.resolve(result.json())
       } 
       else{
        return Promise.reject("error")
       }
    }).then(Response=>
    {
        console.log(Response);
        productItem=Response;
        createProductList();
    }
    ).catch(error=>
    {
        alert(error);
    }
    )
}

const createProductList= ()=>
{
    let products="";
    productItem.forEach(product =>{
        products+=`<div class="card" style="width:400px">
  <img class="card-img-top" src="${product.images}" alt="Card image">
  <div class="card-body">
    <h4 class="card-title"> ${product.title} </h4>
    <p class="card-text"> ${product.description} </p>
    <p class="card-text"> price: ${product.price} </p>
    <p class="card-text"> discountPercentage:${product.discountPercentage} </p>
    <p class="card-text">rating: ${product.rating} </p>
    <p class="card-text">stock: ${product.stock} </p>
    <p class="card-text">brand: ${product.brand} </p>
    <p class="card-text"> category: ${product.category} </p>
  
    <button type="button" onClick="addsaveforlater(${product.id})" class="btn btn-primary">Add to saveforlater </button> 
  </div>
</div>`
    });

    document.getElementById("products").innerHTML=products;
}

const getSaveForLater=() =>{
    return fetch("http://localhost:3000/saveforLater")
    .then((result)=>
    {
        if(result.status==200){
            return Promise.resolve(result.json())
           } 
           else{
            return Promise.reject("error")
           }
        }).then(Response=>
        {
            console.log(Response);
            favourites=Response;
            createSaveforlaterList();
        }
        ).catch(error=>
        {
            alert(error);
    })
}

const createSaveforlaterList =() =>{
    let saveforlater="";
    favourites.forEach(product=>{
        saveforlater+=`<div class="card" style="width:400px">
  <img class="card-img-top" src="${product.images}" alt="Card image">
  <div class="card-body">
    <h4 class="card-title"> ${product.title} </h4>
    <p class="card-text"> ${product.description} </p>
    <p class="card-text"> price: ${product.price} </p>
    <p class="card-text"> discountPercentage:${product.discountPercentage} </p>
    <p class="card-text">rating: ${product.rating} </p>
    <p class="card-text">stock: ${product.stock} </p>
    <p class="card-text">brand: ${product.brand} </p>
    <p class="card-text"> category: ${product.category} </p>
   
    <button type="button" onClick="deletefromsaveforlater(${product.id})" class="btn btn-primary">Delete from saveforlater </button> 
  </div>
</div>`
    });
    document.getElementById("saveforlater").innerHTML=saveforlater;

}

const addsaveforlater=(id) =>
{
 if(!isProductAlreadyInSaveforlaterlist(id)){
    console.log("Its true")
    let productObject = getProductById(id)
    {   
        console.log(productObject);
       
        return fetch("http://localhost:3000/saveforLater",
        {
            method:'POST',
            body : JSON.stringify(productObject),
            headers:{
                'Content-Type':'application/json',
                 'Accept' :'application/json'
        }
    }).then((result)=>
    {
        if(result.status == 200 || result.status==201)

        {    favourites.push(productObject);
             return Promise.resolve(favourites);

        }
        else
         { 
            return Promise.reject("Product is already there in favourite section")
         }
        
        }).then((Result)=> 
        {
            createSaveforlaterList();
            return Result;
        }). catch(error=>
        {
            throw new Error(error);
        })
    }
}
    else 
    {
alert("Product is already there in favourite section");
    }

    
} 

const isProductAlreadyInSaveforlaterlist=(id) =>
{
    alert("isProductAlreadyInSaveforlaterlist" +id)
    for(let fav in favourites)
        {
            if(id== favourites[fav].id)
            {
                alert("true");
                return true;
            }
        alert("false");
    }
        return false;
}

const getProductById=(id)=>
{
    for( let product in productItem){
        if(id==productItem[product].id){
            return productItem[product];
        }
    }
}
const deletefromsaveforlater = (id) =>
    {
        return fetch("http://localhost:3000/saveforLater/"+id,
            {
                method:'delete'
            }
        )
        .then((response)=>{
            if(response.status==200)
                {
                    alert("Record delete from favourite")
                    favourites=response;
                    getSaveForLater();
                    return Promise.resolve(response.json());
                }
                else 
                {
                    return Promise.reject("Error");
                }
            })
            .catch(error=>
            {
                alert(error);
            })
        }