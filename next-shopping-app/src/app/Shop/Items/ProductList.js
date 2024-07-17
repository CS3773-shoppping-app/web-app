import { useEffect, useState } from "react/cjs/react.production.min";
import { fetchProducts } from "../../../../_lib/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    },[]);

    return(
        <div className="container mx-auto">
            {products.map((product) => (
                <div key={product.id} className="border p-4 rounded">
                    <img src={product.image} className="w-full h-48 w-48 object-cover" />
                    <h2>{product.name}</h2>
                    <p>{product.stock}</p>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;