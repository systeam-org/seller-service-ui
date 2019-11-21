import React, { useRef, useState, useEffect } from "react";
//import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewProduct.css";
import axios from "axios";


export default function NewProduct(props) {
    const imagefile = useRef(null);
    const [content, setContent] = useState("");
    const [productname, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");
    const [productdescription, setProductdescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [productcategories, setProductcategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }

            try {
                const categories = await getProductCategories()
                setProductcategories(categories)
            } catch (e) {
                alert(e);
            }
            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await addProduct();
            props.history.push("/products");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }

        setIsLoading(false)
    }

    function handleFileChange(event) {
        imagefile.current = event.target.files[0];
    }

    function getProductCategories() {
        return axios.get(config.SELLER_BASE_URL + config.SELLER_PRODUCT_CATEGORIES
        ).then(res => {
            res.data.unshift('Select Category...')
            return res.data
        })
    }


    function addProduct() {
        console.info('SeletecCategory: ', selectedCategory)

        let rawData = {
            category_name: selectedCategory,
            email: "seller1@gmail.com",
            product_name: productname,
            description: productdescription,
            price: price,
            available_quantity: quantity
        }
        rawData = JSON.stringify(rawData)
        let formData = new FormData()
        formData.append('image', imagefile.current)
        formData.append('data', rawData)
        return axios.post(config.SELLER_BASE_URL + config.SELLER_ADD_PRODUCT,formData, {
            headers:{
                'content-type': 'application/x-www-form-urlencoded'
            },
        }).then(res => {
            return res.data
        })
    }


    function renderLander() {
        return (
            <div className="lander">
                <h1></h1>
                <p></p>
            </div>
        );
    }

    function renderProductsDetailsForm() {

        return <div className="NewProduct">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="newproduct">
                    <ControlLabel>Categories</ControlLabel>
                    <FormControl componentClass="select" defaultValue="Select Category..." onChange={e => setSelectedCategory(e.target.value)}>
                        {productcategories.map((category, index) => <option key={index} value={category}>{category}</option>)}
                    </FormControl>
                    <ControlLabel>Product Name</ControlLabel>
                    <FormControl
                        value={productname}
                        onChange={e => setProductName(e.target.value)}
                    />
                    <ControlLabel>Product Description</ControlLabel>
                    <FormControl
                        value={productdescription}
                        onChange={e => setProductdescription(e.target.value)}
                    />
                    <ControlLabel>Price</ControlLabel>
                    <FormControl
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <ControlLabel>Quantity</ControlLabel>
                    <FormControl
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <ControlLabel>Product Image</ControlLabel>
                    <FormControl onChange={handleFileChange} type="file" />
                </FormGroup>

                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                >
                    Add Product
                </LoaderButton>
            </form>
        </div>
    }

    return (
        <div className="Home">
            {props.isAuthenticated ? renderProductsDetailsForm() : renderLander()}
        </div>
    );
}