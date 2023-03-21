import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  
  try {

    const { name } = req.body;

    if(!name) {
      return res.status(422).json({
        errors: ['Nome é obrigatório!']
      });
    }

    const existsCategory = await categoryModel.findOne({ name });

    if(existsCategory) {
      return res.status(422).json({
        errors: ['Já existe uma categoria com esse nome!'],
      });
    }

    const newCategory = new categoryModel.create({
      name,
      slug: slugify(name)
    })

    res.status(201).json(newCategory);

  }catch(err){
    res.status(500).json({
      success: false,
      err,
      message: 'Falha ao criar categoria'
    })
  }
}

export const updateCategory = async (req, res) => {
  
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id, 
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Categoria atualizada com sucesso!',
      category
    });

  }catch(err){
    res.status(500).json({
      success: false,
      err,
      message: 'Falha ao atualizar categoria'
    })
  }
}

export const getCategories = async (req, res) => {
  
  try {

    const categories = await categoryModel.find()
    .sort({ createdAt: -1 })
    .select('-__v');

    if(!categories) {
      return res.status(404).json([
          {
            success: false,
            message: 'Nenhuma categoria encontrada!'
          }
        ])
    
      }

    res.status(200).json(
      categories
    )

  }catch(err){
    res.status(500).json({
      success: false,
      err,
      message: 'Falha ao buscar categorias'
    });
  };
};

export const singleCategory = async (req, res) => {
  
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });

    if(!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada!'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Categoria encontrada com sucesso!',
      category
    })


  }catch(err){
    res.status(500).json({
      success: false,
      err,
      message: 'Falha ao buscar categoria'
    });
  };
}

export const deleteCategory = async (req, res) => {
  
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

    if(!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada!',
        category
      });
    };

    res.status(200).json({
      success: true,
      message: 'Categoria deletada com sucesso!',
    });

  }catch(err){
    res.status(500).json({
      success: false,
      err,
      message: 'Falha ao deletar categoria'
    })
  };

}