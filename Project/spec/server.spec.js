var request = require('request')

describe('calc', () => {
  it('should multiply 2 and 2', () => {
      expect(2*2).toBe(4)
  })
})

describe('get messages', () => {
  it('should return 200 ok', () => { // "done" 4 async??
    request.get('http://localhost:4000/messages', (err, res) => {
      expect(res.statusCode).toEqual(200)
    })
  })
  it('should return a list, thats not empty', (done) => { //"done" 4 async??
    request.get('http://localhost:4000/messages', (err, res) => {
      expect(JSON.parse(res.body).length).toBeGreaterThan(40) //bc tests length that should be 70-80 char
      done()
    })
  
  })
})