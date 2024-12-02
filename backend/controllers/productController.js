import productModel from "../models/productModel.js"
import fs from "fs";
import slugify from 'slugify';
import { Buffer } from "buffer";

export const createProduct = async (req, res) => {
  try {

    const { name, price, description, category, quantity, shipping, photo } = req.body;
    console.log(name, price, description, category, quantity, shipping, photo);

    // Validações
    if (!name || !price || !description || !category || !quantity) {
      return res.status(400).json({
        status: "error",
        message: "Todos os campos são obrigatórios",
      });
    }

    const matches = photo.match(/^data:([A-Za-z-+/]+);base64,(.*)$/);
    if (!matches) {
      return res.status(400).json({
        status: "error",
        message: "Formato de imagem inválido",
      })
    }

    const buffer = Buffer.from(matches[2], "base64");
    const contentType = `image/${matches[1]}`;

    // Criação do produto
    const product = await productModel.create({
      name,
      price,
      description,
      category,
      quantity,
      shipping,
      slug: slugify(name, { lower: true, strict: true }),
      photo: {
        data: buffer,
        contentType: contentType
      }
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Produto criado com sucesso",
      product,
    });


  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Erro interno no servidor",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 }).populate("category");

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "Produtos retornados com sucesso",
      products,
    })

  } catch (err) {
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

    if (!product) {
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

  } catch (err) {
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

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Foto não encontrada",
      });
    }

    if (!product.photo.data) {
      return res.status(404).json({
        status: "error",
        message: "Foto não encontrada",
      });
    }

    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }

  } catch (err) {
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

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Erro interno no servidor",
    });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
      console.log(product.photo.data);
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
}

export const productFiltersController = async (req, res) => {
  console.log(req.body);
  try {
    const { categoryId, price } = req.body;

    let args = {};

    if (categoryId) args.category = categoryId;
    if (price) {
      const priceRange = price?.split('-');
      if (priceRange?.length === 2) {
        args.price = { $gte: parseFloat(priceRange[0]), $lte: parseFloat(priceRange[1]) };
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid price format. Please use 'min-max' format."
        });
      }
    }

    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in Filters",
    });
  }
}

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in Count",
    });
  }
}

export const productListController = async (req, res) => {
  try {
    const perPage = 10;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })

    res.status(200).send({
      success: true,
      products,
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in List",
    });
  }
}

export const productSearchController = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);

    const products = await productModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ]
    }).select("-photo").exec();

    res.status(200).json({ products });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in Search",
    });
  }
}

export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.status(200).send({
      success: true,
      products,
    })

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in Related Products",
    });
  }
}