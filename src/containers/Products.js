import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Products.css";
import axios from "axios"
import config from "../config";



export default function Products(props) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }

            try {
                const prods = await loadProducts();
                setProducts(prods)
            } catch (e) {
                alert(e);
            }
            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);

    function loadProducts() {
        return axios.get(config.SELLER_BASE_URL + config.SELLER_PRODUCTS_API, {
            params: {
                email: 'seller1@gmail.com'
            }
        }).then(res => {
            return res.data
        })
    }

    function renderProductsList(products) {
        return [{}].concat(products).map((product, i) =>
            i !== 0 ? (
                <LinkContainer key={product.product_id} to={`/products/${product.product_id}`}>
                    <ListGroupItem header={product.product_name.trim().split("\n")[0]}>
                        {"Product Description: " + product.description}
                    </ListGroupItem>
                </LinkContainer>

            ) : (
                <LinkContainer key="new" to="/products/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Add a new product
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        );
    }


    function renderLander() {
        return (
            <div className="lander">
                <h1></h1>
                <p></p>
            </div>
        );
    }

    function camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
        {
            return index == 0 ?  word.toUpperCase() : word.toLowerCase();
        }).replace(/\s+/g, ' ');
    }

    function renderProductsTableHeader() {
        let header = ["Image", 'Category', "Product Name", "Product Description", "Price", "Available Quantity"]
        return header.map((key, index) => {
            //return <th key={index}>{camelCase(key.toUpperCase().replace('_', "  "))}</th>
            return <th key={index}>{key}</th>
        })


    }

    function renderProductsTableData() {
        return products.map((product, index) => {
            const {product_id, product_name, category_name, description, price, available_quantity, image } = product //destructuring
            let i = "data:image/jpeg;base64,"+ image
            return (
                <tr key={product_id}>
                    <td>{<img src={i}/>}</td>
                    <td>{category_name}</td>
                    <td>{product_name}</td>
                    <td>{description}</td>
                    <td>${price}</td>
                    <td>{available_quantity}</td>
                </tr>
            )
        })
    }

    function renderProducts() {
        return (
            <div>
                <h1 id='title'>Products</h1>
                <table id='Products'>
                    <tbody>
                    <tr>{!isLoading && renderProductsTableHeader()}</tr>
                    {renderProductsTableData()}
                    </tbody>
                </table>
                <LinkContainer key="new" to="/products/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Add Product
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            </div>
        )
    }

    return (
        <div className="Home">
            {props.isAuthenticated ? renderProducts() : renderLander()}
        </div>
    );
}