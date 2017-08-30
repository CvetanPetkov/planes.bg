module.exports = {
  handleMongooseError: (err) => {
    let firstKey = Object.keys(err.errors)[0]
    let message = err.errors[firstKey].message

    return message
  },
  handleCommonError: (req, res, errMsg, url) => {
    res.locals.globalError = errMsg
    return res.render(url, req.body)
  }
}
