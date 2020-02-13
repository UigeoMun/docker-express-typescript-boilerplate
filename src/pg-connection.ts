import pg,{ Client, Pool, PoolConfig, ClientConfig, PoolClient, QueryConfig } from 'pg';
import logger from './logger';



export default class PgConnection {
    private readonly gpUrl : string;
    private pool : Pool;
    private config : PoolConfig;
    constructor( config : PoolConfig ) {

        console.log("PG CONNECT")

        this.config = config;
        this.pool = new Pool(this.config)
        this.pool.on( "connect", this.onConnect )
        this.pool.on( "acquire", this.onAquire )
        this.pool.on( "remove", this.onRemove)
        this.pool.on( "error", this.onError )
        
    }

    public getClient = async () => {
        logger.log({
            level : 'info',
            message : `Connecting to postgresql at ${this.config.host}`
        })
        const client = await this.pool.connect();
        return client;
    }

    public singleQuery = async ( query : QueryConfig ) => {
        try{
            const result = await this.pool.query(query)
            return result;
        }catch(error){
            throw new Error(error.message)
        }

    }


    public getPool = () => this.pool;

    private onConnect = ( client : PoolClient ) => {
        //TODO
        logger.log({
            level : 'debug',
            message : 'connect'
        });
    }

    private onRemove = ( client : PoolClient ) =>{
        //TODO
        console.log(client)
    }

    private onAquire = ( client : PoolClient ) => {
        //TODO
        console.log(client)
    }

    private onError = ( error : Error, client : PoolClient ) => { 
        //TODO
        logger.log({
            level : 'error',
            message : 'fail to connect'
        });
        console.log(error)
    }
}