module.exports = {
  handleMongooseError: (err) => {
    let firstKey = Object.keys(err.errors)[0]
    let message = err.errors[firstKey].message

    return message
  },
  handleCommonError: (req, res, errMsg, url, selector) => {
    res.locals.globalError = errMsg
    if (selector) {
      req.body[selector] = true
      req.body['style'] = 'selected'
    }

    return res.render(url, req.body)
  }
}
