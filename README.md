# Jaeger tracing - NodeJS

## pre installation
- you have `NodeJs` installed in your machine
- you have jaeger ui in your local machine

## setup
- pull this repository or just download
- run `npm install` to install all dependencies
- run `npm run dev`

## how to use
- open `http://localhost:3000/test?type=kali&valA=2&valB=3` in your browser
- change type to `tambah` `kurang` `bagi` `kali`
- open `http://localhost:16686/search` to see all span in Jaeger UI
