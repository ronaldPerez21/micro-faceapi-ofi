function custom_response(status, res){
    var today = new Date();
    var date = today.getFullYear()+'-'
    +(today.getMonth()+1)+'-'
    +today.getDate()+"|"
    +today.getHours() + ":" 
    + today.getMinutes() + ":" 
    + today.getSeconds();
    
    if(status === 200) return {
        message : "Proceso terminado exitosamente",
        status: status,
        date : date,
        result : res
    }

    if(status === 201) return {
        message : "Elemento creado exitosamente",
        status: status,
        date : date,
        result : res
    }

    if(status === 500) return {
        message: "Ocurrio un detalle en el servidor",
        status: status,
        date : date,
        result : res
    }

    return {
        message: "Ocurrio un detalle en el servidor",
        status: status,
        date : date,
        result : res
    }
}

module.exports = custom_response;