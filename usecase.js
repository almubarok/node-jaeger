const {startSpan} = require('./tracer')

function jumlah(ctx, valA, valB){
  const trace = startSpan("usecase - jumlah", ctx)
  const result = valA + valB
  trace.setAttribute('valA', valA) 
  trace.setAttribute('valB', valB) 
  trace.setAttribute('result', result) 
  trace.end()
  return result
}

function kurang(ctx, valA, valB){
  const trace = startSpan("usecase - kurang", ctx)
  const result = valA - valB
  trace.setAttribute('valA', valA) 
  trace.setAttribute('valB', valB) 
  trace.setAttribute('result', result) 
  trace.end()
  return result
}

function bagi(ctx, valA, valB){
  const trace = startSpan("usecase - bagi", ctx)
  const result = valA / valB
  trace.setAttribute('valA', valA) 
  trace.setAttribute('valB', valB) 
  trace.setAttribute('result', result) 
  trace.end()
  return result
}

function kali(ctx, valA, valB){
  const trace = startSpan("usecase - kali", ctx)
  const result = valA * valB
  trace.setAttribute('valA', valA) 
  trace.setAttribute('valB', valB) 
  trace.setAttribute('result', result) 
  trace.end()
  return result
}

module.exports = {
  jumlah, kurang, bagi, kali
}