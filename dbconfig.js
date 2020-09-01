module.exports = {
  sqlite:{
    client: 'sqlite3',
    connection: {
      filename: "./data.sqlite"
    },
    pool:{
      min:0,
      max:7
    }
  }
}
