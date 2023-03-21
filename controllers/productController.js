import productModel from "../models/productModel.js"
import fs from "fs";
import slugify from 'slugify';

export const createProduct = (req, res) => {
 try {
  const { name, slug, price, description, category, quantity, shipping } = req.fields;
  const { photo } = req.files;

  // validations
  switch (true) {
    case !name:
      return res.status(400).json({ message: "Name is required" });
    case !price:
      return res.status(400).json({ message: "Price is required" });
    case !description:
      return res.status(400).json({ message: "Description is required" });
    case !category:
      return res.status(400).json({ message: "Category is required" });
    case !quantity:
      return res.status(400).json({ message: "Quantity is required" });
    case photo && photo.size > 1000000:
      return res.status(500).json({ message: "Imagem tem que ter menos de 1MB !"});
  }

  // create product
  const product = new productModel({
    ...req.fields,
    slug: slugify(name)
  })

  if(photo) {
    product.photo.data = fs.readFileSync(photo.path);
    product.photo.contentType = photo.type;
  }

  product.save()
  .then(() => res.status(201).json({
    success: true,
    message: "Produto criado com sucesso",
    product
  }))

 }catch(err) {
   res.status(500).json({
     status: "error",
     message: "Erro interno no servidor",
   });
 } 
}

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 }).populate("category");

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "Produtos retornados com sucesso",
      products,
    })
    
  } catch(err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Erro interno no servidor",
    });
  }
}

export const getSingleProducts = async (req, res) => {
  try {

    const { slug } = req.params;
    const product = await productModel.findOne({ slug }).select("-photo").populate("category");

    if(!product) {
      return res.status(404).json({
        status: "error",
        message: "Produto não encontrado",
      });
    }

    res.status(200).send({
      success: true,
      message: "Produto retornado com sucesso",
      product,
    })
  
  }catch(err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Erro interno no servidor",
    });
  }
}

export const getProductPhoto = async (req, res) => {
  try {

    const product = await productModel.findById(req.params.pid).select("photo");

    if(!product) {
      return res.status(404).json({
        status: "error",
        message: "Foto não encontrada",
      });
    }

    if(product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }

  }catch(err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Erro interno no servidor",
    });
  }
}

export const deleteProduct = async (req, res) => {
  
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Produto removido com sucesso",
      product,
    })

  }catch(err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Erro interno no servidor",
    });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { name, slug, price, description, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
  
    // validations
    switch (true) {
      case !name:
        return res.status(400).json({ message: "Name is required" });
      case !price:
        return res.status(400).json({ message: "Price is required" });
      case !description:
        return res.status(400).json({ message: "Description is required" });
      case !category:
        return res.status(400).json({ message: "Category is required" });
      case !quantity:
        return res.status(400).json({ message: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(500).json({ message: "Imagem tem que ter menos de 1MB !"});
    }
  
    // create product
    const product = await productModel.findByIdAndUpdate(req.params.pid, 
      {...req.fields, slug: slugify(name)},
      {new: true},
    );
  
    if(photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
  
    res.status(200).send({
      success: true,
      message: "Produto atualizado com sucesso",
      product,
    })
  
   }catch(err) {
     res.status(500).json({
       status: "error",
       message: "Erro interno no servidor",
     });
   } 
}