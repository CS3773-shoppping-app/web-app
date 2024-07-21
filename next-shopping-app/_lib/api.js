export async function fetchProducts(){
    const res = await fetch('/api/products');
    const data = await res.json();
    console.log(data);
    return data;
}