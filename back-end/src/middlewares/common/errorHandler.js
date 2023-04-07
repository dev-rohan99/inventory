

export const errorHandler = (err, req, res, next) => {

    console.log(err);
    const status = err.status | 500
    if(err.message){
        res.status(status).json({
            status : status,
            message : err.message
        });
    }else{
        res.status(500).json({
            message : "Something went wrong!"
        });
    }

}

