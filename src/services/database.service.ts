import { MongoClient, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter-dev.5mloxfg.mongodb.net/?retryWrites=true&w=majority&appName=twitter-dev`

class DatabaseService {
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
  }

  private async connect() {
    await this.client.connect()
    await this.client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  }

  private async close() {
    await this.client.close()
  }

  public run() {
    try {
      const databaseService = new DatabaseService()

      databaseService.connect()
    } catch (error) {
      this.close()
    }
  }
}

const databaseService = new DatabaseService()

export default databaseService
