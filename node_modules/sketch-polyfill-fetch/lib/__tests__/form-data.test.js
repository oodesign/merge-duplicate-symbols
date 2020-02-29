const fs = require('@skpm/fs')
const FormData = require('../form-data')
const fetch = require('../index')

test('should be an object with an append function', () => {
  const formData = new FormData()
  expect(formData._isFormData).toBe(true)
  expect(typeof formData._boundary).toBe('string')
  expect(typeof formData.append).toBe('function')
  expect(String(formData._data.class())).toBe('NSConcreteMutableData')
})

function getScriptFolder(context) {
  const parts = context.scriptPath.split('/')
  parts.pop()
  return parts.join('/')
}

test('should append data', (context) => {
  const formData = new FormData()
  expect(formData._data.length()).toBe(0)

  formData.append('username', 'john')
  expect(formData._data.length()).toBe(106)

  formData.append('username', {
    fileName: 'manifest.json',
    data: fs.readFileSync(getScriptFolder(context) + '/manifest.json'),
    mimeType: 'text/json'
  })
  expect(formData._data.length()).toBe(685)
})
