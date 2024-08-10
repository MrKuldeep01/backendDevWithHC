const asyncHandler = (funcToHandle) => {
async (req,res,next)=>{
    try {
      await funcToHandle(req,res,next) 
    } catch (error) {
        console.log("error");
        res.status(501).json({
            message:"kuch to gdbd he dya",
            error:error
        })
    }
}


}

export default asyncHandler
