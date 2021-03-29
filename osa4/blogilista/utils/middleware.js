const errorHandler = (error, request, response, next) => {
    console.error(error.name, error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ reason: 'malformatted id' }).end()
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({ reason: error.message }).end()
    }
    next(error)
}

module.exports = {
    errorHandler
}