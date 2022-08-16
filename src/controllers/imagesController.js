//Funcion para cargar imagen de producto
export async function uploadFileProduct(req, res) {    
    let image = "product_default.png"
    if (req.file !== undefined){
        image = req.file.filename
    }
    res.status(200).json({url: `public/uploads/products/${image}`})
}

//Funcion para cargar imagen de usuario
export async function uploadFileUser(req, res) {    
    let image = "user_default.png"
    if (req.file !== undefined){
        image = req.file.filename
    }
    res.status(200).json({url: `public/uploads/users/${image}`})
}
