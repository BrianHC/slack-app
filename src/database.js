const CosmosClient = require("@azure/cosmos").CosmosClient;

class Database {
    client;
    database;
    container; 

    constructor (){

    }

    init({endpoint, key, databaseId, containerId}){
        this.client = new CosmosClient({ endpoint, key });
        this.database = this.client.database(databaseId)
        this.container = this.database.container(containerId)
    }

    getClient(){
        return this.client;
    }

    async testFetchAll() {
          // query to return all items
          try{
              console.log('fetching...')
            const querySpec = {
                query: "SELECT * from c"
              };
              
              // read all items in the Items container
              const  {resources: items}  = await this.container.items
                .query(querySpec)
                .fetchAll();
          
               // console.log(items)
              items.forEach(item => {
                console.log(`${item.id} - ${item.value}`);
              });
             } catch(e) {
              console.log(e)
          }

    }
}

module.exports = new Database();