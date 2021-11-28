const express = require("express");
const product = require("../usecases/products");
const user = require("../usecases/users");
const jwt = require("../lib/jwt");
const { authHandler, userHandler,postHandler} = require("../middlewares/authHandlers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  //posts/?search=
  //posts/?date=

  const { search } = req.query;
  const { date } = req.query;

  // console.log("search req.query:", search);
  // console.log("date req.query:", date);
  try {
    const productRetrieve = await product.get(search, date);
    res.status(200).json({
      ok: true,
      message: `Product retrieved`,
      payload: productRetrieve,
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const productId = await product.getById(id);
    if (productId) {
      res.status(200).json({
        ok: true,
        message: `Product {id} retrieved`,
        payload: {
          postId,
        },
      });
    } else {
      res.status(404).json({
        ok: false,
        message: `Product id not found`,
        payload: {
          postId,
        },
      });
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
});

router.use(authHandler);

router.post("/", async (req, res, next) => {

    const {token} = req.headers
    
    const productPost = req.body

    const payload = await jwt.verifyToken(token)
    
    const {sub} = payload
    // Trayendo información de creador product
    const userObject = await user.getById(sub)    
    const userName = userObject.username
    
    try {
        
       const productCreated = await product.create(dataPost,userName,sub)
       res.status(200).json({
        status:true, 
        message:" Product created succesfully",
       })
    } catch (err) {
        next(err);
        console.log("err",err);
    }
    
    
})   

// Usamos userhHandler para que solo el usuario puede modificar su propio registro
router.patch("/:id", postHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title,image,type,price } = req.body;
    
    const payload = await product.update(id,{title,image,type,price} );
    
      if (!payload) {
        throw new Error("Product not found");
      }
      res.status(200).json({
        status:true,
        message:"Successfully updated"
      })
    }catch (err){

      next(err);
      console.log(err);
    }
  }
)

router.delete("/:id",postHandler, async (req, res, next) => {
  const { id } = req.params;
  try {
    const productDel = await product.del(id);
    res.status(200).json({
      ok: true,
      message: `Product${id} deleted`,
      payload: {
        productDel,
      },
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

module.exports = router;

