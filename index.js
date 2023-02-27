require('dotenv').config()
const { initTracing, startSpan } = require('./tracer')
const {jumlah, kurang, bagi, kali} = require('./usecase')

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/test',  (req, res) => {
  const {type, valA, valB} = req.query
  const trace = startSpan("handler - test")
  trace.setAttribute('type', type)
  trace.setAttribute('valA', valA)
  trace.setAttribute('valB', valB)
  if(!type || !valA || !valB) {
    const msg = 'type atau valA atau valB tidak ditemukan'
    trace.setAttribute('error', true)
    trace.setAttribute('error.message', msg)

    trace.end()
    return res.json({message: `Error: ${msg}`})
  }

  let result = 0
  switch (type) {
    case 'jumlah':
      result = jumlah(trace.spanContext(), valA, valB)
      break;
    case 'kurang':
      result = kurang(trace.spanContext(), valA, valB)
      break;
    case 'bagi':
      result = bagi(trace.spanContext(), valA, valB)
      break;
    case 'kali':
      result = kali(trace.spanContext(), valA, valB)
      break;
  
    default:
      const msg = 'type tidak valid'
      trace.setAttribute('error', true)
      trace.setAttribute('error.message', msg)

      trace.end()
      return res.json({message: `Error: ${msg}`})
  }

  trace.end()
  return res.json({message: `Success. type ${type}, valA = ${valA}, valB = ${valB}. result = ${result}`})
})


app.listen(3000, async () => {
  await initTracing()
  console.log('======================================')
  console.log('       Press Ctrl+C to quit.')
  console.log('======================================')
})
