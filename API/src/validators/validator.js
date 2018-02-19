let errors = []

function ValidationContract () {
  errors = []
}

ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0) {
    errors.push({
      message: message
    })
  }
}

ValidationContract.prototype.hasMinLength = (value, min, message) => {
  if (!value || value.length < min) {
    errors.push({
      message: message
    })
  }
}

ValidationContract.prototype.hasMaxLength = (value, max, message) => {
  if (!value || value.length > max) {
    errors.push({
      message: message
    })
  }
}

ValidationContract.prototype.isFixedLength = (value, length, message) => {
  if (!value || value.length !== length) {
    errors.push({
      message: message
    })
  }
}

ValidationContract.prototype.isEmail = (value, message) => {
  let reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
  if (!reg.test(value)) {
    errors.push({
      message: message
    })
  }
}

ValidationContract.prototype.errors = () => {
  return errors
}

ValidationContract.prototype.clear = () => {
  errors = []
}

ValidationContract.prototype.isValid = () => {
  return errors.length === 0
}

module.exports = ValidationContract
