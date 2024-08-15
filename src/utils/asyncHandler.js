// const asyncHandler = (funcToHandle) => {
// async (req,res,next)=>{
//     try {
//       await funcToHandle(req,res,next)
//     } catch (error) {
//         console.log("error");
//         res.status(error.code || 501).json({
//             message:"kuch to gdbd he dya !",
//             seccess:false,
//             error:error
//         })
//     }
// }

// }

const asyncHandler = (funToHandle) => {
    return (req, res, next) => {
    Promise.resolve(funToHandle(req, res, next)).catch((error) => next(error));
  };
};

export default asyncHandler;
