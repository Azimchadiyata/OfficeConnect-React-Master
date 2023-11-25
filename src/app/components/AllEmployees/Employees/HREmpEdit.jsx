import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export function ProductEdit() {
    const params = useParams();
    const [product, setProduct] = useState([{}]);
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:4000/details/${params.id}`
        })
            .then(response => {
                setProduct(response.data);
            })
    }, []);

    /*
        - create formik form with initial values
        - collect values for elements
        - post to api using axios
        Syntax:
        onSubmit
        axios.update("http://localhost:4000/updateproduct/{values.ProductId}",{
            Name: values.Name,
            Price: values.Price,
            Stock: values.Stock
        })
        - redirect to products
    */
    return (
        <div>
            <h2>Edit Product</h2>
            <form>
                <dl>
                    <dt>Name</dt>
                    <dd><input value={product[0].Name} type="text" /></dd>
                    <dt>Price</dt>
                    <dd><input type="text" value={product[0].Price} /></dd>
                    <dt>Stock</dt>
                    <dd><input type="checkbox" checked={product[0].Stock} /> Available</dd>
                </dl>
                <button className="btn btn-info">Update</button>
            </form>
            <div>
                <Link to="/products">Back to Products</Link>
            </div>
        </div>
    )
}