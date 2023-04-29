const express = require('express');
const router = express.Router();
const {Pool}  = require('pg');
const { stringify } = require('querystring');
router.use(express.json())

const pool = new Pool({host:"localhost",
                        user:"postgres",
                        password:"teresa",
                        database:"feria_de_flores"})

router.get ('/', async (req, res)=>{
const resultado = await pool.query("select * from ramos");
res.json(resultado.rows)
  //const data = await resultado.json();
  //res.render("index", {ramos: data});
   // res.json ({})
})



router.delete('/:id',(req,res)=>{
  const{id} = req.params;
  //DELETE CON RETURNING
  let ramos;			
  ramos.forEach((element, index)=>{			
           
      if(element.id == id){			
          ramos = index;			
      }			
  })			
  if(ramos){			
      ramos.splice(ramos,1);			
  }			
  res.status(200).json(ramos) 		
});		

  //res.status(200).json(result.rows)
  

  //res.status(404).json ({'error':'datos no encontrados'});
   //delete con returning
   
   router.get("/:id",(req,res)=>{    			
    const {id} = req.params;			
    let ramo;			
    ramo.forEach((element, index)=>{			
       			
        if(element.id == id){			
            ramo = index;			
        }			
    })			
    res.status(200).json(ramo[index]) 			
});			

/*router.post("/",(req,res)=>{		
  try{		
      const id = ramo.length+1		
      const ramo = {id,...req.body};		
      ramo.push(ramo)		
      res.status(201).json(ramo) 		
  }catch (e){		
      res.status(500).json({"error":e})		
  }		
      
});*/		
router.post('/', async(req,res)=>{
    const {nombre, descripcion, precio, imagen, id_categoria, es_destacada, precio_oferta, stock, mas_vendida} = req.body
    await pool.query('insert into ramos (nombre, descripcion, precio, imagen, id_categoria, es_destacada, precio_oferta, stock, mas_vendida) values($1,$2,$3)',[nombre, descripcion, parseInt(precio), imagen, parseint(id_categoria), es_destacada, parseInt(precio_oferta), parseint(stock), mas_vendida])
    const resultado = await pool.query("select * from ramos");
    res.json(resultado.rows)
    //, {
       // method: "post",
       // body: stringify(body),
       // headers: {"Content-Type":"application/json"}
    //});
    //const data = awaitresultado.json();
    //res.render("index", {ramos: data});
    //res.json(resultado.rows)
})

/*router.put('/', async(req, res)=>{
    const {id, nombre, descripcion, precio, imagen, id_categoria, es_destacada,precio_oferta, stock, mas_vendida} = req.body;
    const body = {nombre: nombre, descripcion: descripcion, precio: precio, imagen: imagen, id_categoria: id_categoria, es_destacada: es_destacada, precio_oferta: precio_oferta, stock: stock, mas_vendida: mas_vendida}
    const resultado = await pool.query("select *from ramos" +id, {
        method: "put",
        body:JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    });
})
  const data = await resultado.json();
  res.render("index",{ramos:data});

router.put("/:id",(req,res)=>{res.send("PUT")})	*/


router.put('/:id',async(req, res)=>{
    const {id}= req.params
    const{nombre, descripcion, precio, imagen, id_categoria, es_destacada, precio_oferta, stock, mas_vendida} = req.body
    await pool.query('update ramos set nombre=$1, descripcion=$2 ,precio=$3, imagen=$4, id_categoria=$5, es_destacada=$6, precio_oferta=$7, stock=$8, mas_vendida=$9 where id=$10',[nombre,descripcion, parseInt(precio), imagen, parseInt(id_categoria), es_destacada, parseInt(precio_oferta),parseInt(stock), mas_vendida, parseInt(id)])
    const resultado = await pool.query ("select * from ramos");
    res.json(resultado.rows)
})

module.exports = router;
