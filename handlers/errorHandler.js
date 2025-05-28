

const errorHandler = (err, req, res, next) => {
  if(err){
    if(err.message){
    res.status(400).json({
      status: 'error',
      error: err.message,
    });
  }else{
    res.status(500).json({
      status: 'error',
      error: err,
    });
  } 
  }else{
    next();
  }
}

module.exports = errorHandler;