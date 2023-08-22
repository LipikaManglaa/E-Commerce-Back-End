const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  }
  catch (error) {
    res.status(500).json(error);
  }

});

//retrieve data by id
router.get('/:id', async(req, res) => {
  try{
    const tagData=await Tag.findByPk(req.params.id,{
     include:[{ model: Product }],
    });
    if(!tagData){
     res.status(404).json({message:'No tag found with that id!'})
    }
    res.status(200).json(tagData)
   }catch(error){
     res.status(500).json(error);
   }
});


//create a new tag
router.post('/', async(req, res) => {
  try{
    const tagData=await Tag.create(req.body);
    res.status(200).json(tagData)
  
   }catch(error){
    res.status(500).json(error);
   }
});


 // update a tag's name by its `id` value
router.put('/:id', async(req, res) => {
  try{
    const tagData=await Tag.update(req.body,{
      where:{
        id:req.params.id
      }
    })
    if(!tagData){
      res.status(404).json({message:'No tag found with that id!'})
     }
     res.status(200).json(tagData)
    
     }catch(error){
      res.status(500).json(error);
     }
    
});

 // delete on tag by its `id` value
router.delete('/:id', async(req, res) => {
  try{
    const tagData=await Tag.destroy({
      where:{
        id:req.params.id
      },
    })
    if(!tagData){
      res.status(404).json({message:'No tag found with that id!'})
     }
     res.status(200).json(tagData)
     }catch(error){
      res.status(500).json(error);
     }
});

module.exports = router;
