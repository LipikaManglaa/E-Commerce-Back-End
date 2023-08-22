const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try{
    const catData=await Category.findAll({
      include:[{ model: Product }],
 });
 res.status(200).json({
catData,
message:"ypu get all categories"
 });
}catch(error){
  res.status(500).json(error);
}

});

//get data by id
router.get('/:id', async(req, res) => {
  try{
   const catData=await Category.findByPk(req.params.id,{
    include:[{ model: Product }],
   });
   if(!catData){
    res.status(404).json({message:'No category found with that id!'})
   }
   res.status(200).json(catData)
  }catch(error){
    res.status(500).json(error);
  }
 
});


//create category 
router.post('/', async(req, res) => {
 try{
  const catData=await Category.create(req.body);
  res.status(200).json(catData)

 }catch(error){
  res.status(500).json(error);
 }
});

router.put('/:id', async(req, res) => {
 try{
const catData=await Category.update(req.body,{
  where:{
    id:req.params.id
  }
})
if(!catData){
  res.status(404).json({message:'No category found with that id!'})
 }
 res.status(200).json(catData)

 }catch(error){
  res.status(500).json(error);
 }
});

//delete category
router.delete('/:id', async(req, res) => {
 try{
const catData=await Category.destroy({
  where:{
    id:req.params.id
  },
})
if(!catData){
  res.status(404).json({message:'No cat found with that id!'})
 }
 res.status(200).json(catData)
 }catch(error){
  res.status(500).json(error);
 }
});

module.exports = router;
