import mongoose from 'mongoose'

const { AsteriskIcon } = require('lucide-react')

const connectToDB = async () => {
 mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('Db Connected Successfully'))
  .catch((e) => console.log(e))
}

export default connectToDB
