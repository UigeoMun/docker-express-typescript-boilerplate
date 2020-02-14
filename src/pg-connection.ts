import pg, {
  Pool, PoolConfig, ClientConfig, PoolClient, QueryConfig
} from 'pg';
import logger from './logger';


export default class PgConnection {
    private readonly gpUrl : string;

    private pool : Pool;

    private config : PoolConfig;

    constructor(config : PoolConfig) {
      this.config = config;

      this.pool = new Pool(this.config);
      this.pool.on('connect', this.onConnect);
      this.pool.on('acquire', this.onAquire);
      this.pool.on('remove', this.onRemove);
      this.pool.on('error', this.onError);
    }

    public getClient = async () => {
      try {
        const client = await this.pool.connect();
        return client;
      } catch (err) {
        throw new Error(err.message);
      }
    }

    public singleQuery = async (query : QueryConfig) => {
      try {
        const result = await this.pool.query(query);
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    }


    public getPool = () => this.pool;

    private onConnect = (client : PoolClient) => {
      // TODO
      logger.info('postgres DB Connected');
    }

    private onRemove = (client : PoolClient) => {
      // TODO
      logger.info('DB Connection Removed');
    }

    private onAquire = (client : PoolClient) => {
      // TODO
      logger.info('New Client Aquired');
    }

    private onError = (error : Error, client : PoolClient) => {
      // TODO
      logger.error('Connection Fail', error);
    }
}
