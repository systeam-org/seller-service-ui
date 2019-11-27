import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios"
import config from "../config";
//import "./SellerProducts.css"
import LoaderButton from "../components/LoaderButton";

export default function SellerProducts(props) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    useEffect(() => {
        async function onLoad() {
            try {

                userHasAuthenticated(false);
                if(window.location.href.includes('id_token'))
                {
                    let token = window.location.hash.replace("#id_token=","");
                    let base64Url = token.split('.')[1];
                    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    config.setCookie("email",JSON.parse(jsonPayload).email,1);
                    config.setCookie("first_name",JSON.parse(jsonPayload).given_name,1);
                    config.setCookie("last_name",JSON.parse(jsonPayload).family_name,1);
                    config.get_user(JSON.parse(jsonPayload).email)
                    userHasAuthenticated(true)
                }
                else if(config.getCookie("email") && config.getCookie("role")) {
                    userHasAuthenticated(true)
                }

                if(isAuthenticated){
                    const prods =  await loadProducts();
                    setProducts(prods)
                }
            } catch (e) {
                alert(e);
            }
            setIsLoading(false);
            setIsAuthenticating(false)
        }

        onLoad();
    }, [props.isAuthenticated]);

    function loadProducts() {
        return axios.get(config.getSellerEndPoint() + config.SELLER_PRODUCTS_API, {
            params: {
                email: config.getCookie("email")
            }
        }).then(res => {
            return res.data
        })
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

    function renderLoaderButton() {
        return (
        <LinkContainer key="new" to="/products/new">
            <LoaderButton
                block
                type="submit"
                bsSize="large"
                bsStyle="primary"
                isLoading={isLoading}
                isAuthenticating
            >
                Add Product
            </LoaderButton>
        </LinkContainer>
        )
    }

    function renderProducts() {
        return (
            !isAuthenticating &&
            <div>
                {isAuthenticated && <h1 id='title'>My Products</h1>}
                <table class="table">
                    <tbody>
                    <tr>{isAuthenticated && renderProductsTableHeader()}</tr>
                    {isAuthenticated && renderProductsTableData()}
                    </tbody>
                </table>
                {isAuthenticated && renderLoaderButton()}

            </div>
        )
    }

    return (
        <div className="Home">
            { renderProducts()}
        </div>
    );
}