var Buffer
try {
  Buffer = require('buffer').Buffer
} catch (err) {}
var util
try {
  util = require('util')
} catch (err) {}

var boundary = "Boundary-" + NSUUID.UUID().UUIDString()

module.exports = function FormData() {
  var data = NSMutableData.data()
  return {
    _boundary: boundary,
    _isFormData: true,
    _data: data,
    append: function(field, value) {
      data.appendData(
        NSString.alloc()
          .initWithString("--" + boundary + "\r\n")
          .dataUsingEncoding(NSUTF8StringEncoding)
      )
      data.appendData(
        NSString.alloc()
          .initWithString("Content-Disposition: form-data; name=\"" + field + "\"")
          .dataUsingEncoding(NSUTF8StringEncoding)
      )
      if (util ? util.isString(value) : typeof value === 'string') {
        data.appendData(
          NSString.alloc()
            .initWithString("\r\n\r\n" + value)
            .dataUsingEncoding(NSUTF8StringEncoding)
        )
      } else if (value && value.fileName && value.data && value.mimeType) {
        var nsdata
        if (Buffer && Buffer.isBuffer(value.data)) {
          nsdata = value.data.toNSData()
        } else if (value.data.isKindOfClass && value.data.isKindOfClass(NSData) == 1) {
          nsdata = value.data
        } else {
          throw new Error('unknown data type')
        }
        data.appendData(
          NSString.alloc()
            .initWithString("; filename=\"" + value.fileName + "\"\r\nContent-Type: " + value.mimeType + "\r\n\r\n")
            .dataUsingEncoding(NSUTF8StringEncoding)
        )
        data.appendData(nsdata)
      } else {
        throw new Error('unknown value type')
      }
      data.appendData(
        NSString.alloc()
          .initWithString("\r\n")
          .dataUsingEncoding(NSUTF8StringEncoding)
      )
    }
  }
}
