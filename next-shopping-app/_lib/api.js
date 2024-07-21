export async function fetchProducts(){
    const res = await fetch('/Api/products');
    const data = await res.json();
    console.log(data);
    return data;
}