

const validatePayload = (req, res, next) => {
    if(req.body.PG == "" || req.body.SG == "" || req.body.SF == "" || req.body.PF == "" || req.body.C == ""){
        console.log("team middleware")
        return next({
            status: 422,
            message: "Must have complete team in order to submit"
        })
    }
    next()
};

module.exports = {
    validatePayload
}