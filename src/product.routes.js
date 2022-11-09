import Router from "express";
import {  ProductsRepository } from "./repository/ProductsRepository.js";

const ProductRoute = Router();

const productsRepository = new ProductsRepository()

ProductRoute.post("/",(request,response)=> {
    const{name, description, quantity,price} = request.body;

    const productAlreadyExists = productsRepository.findByName({name});

    if (productAlreadyExists){
        return response.status(404).json({error: "Product already exists"});
    }

    productsRepository.create({name,description,quantity,price});

    return response.status(201).send()
});

ProductRoute.get("/",(request,response) => {
    const allProducts = productsRepository.list()
    return response.status(201).json(allProducts);
})

ProductRoute.delete("/:id",(request,response) => {
    const {id} = request.params;

    const product = productsRepository.findById({id});

    if(!product) {
        return response.status(404).json({error:"Product not found"});
    }

    productsRepository.delete({id});

    return response.status(201).send();
})

ProductRoute.patch("/:id",( request, response) => {
    const{id} = request.params;
    const {quantity} = request.headers;

    const product = productsRepository.findById({id});

    if (!product){
        return response.status(404).json({error:"product not Found"});
    }

    const updatedProduct = productsRepository.updateQuantity({id,quantity});
 
    return response.status(201).json(updatedProduct);
}); 

export {ProductRoute};