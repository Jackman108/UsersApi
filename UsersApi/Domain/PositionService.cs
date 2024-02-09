using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace UsersApi.Domain
{
    public class PositionService
    {
        private readonly string _connectionString;
        private readonly string _databaseName;

        public PositionService(IConfiguration configuration)
        {
            _connectionString = configuration.GetSection("MongoDBSettings:ConnectionString").Value;
            _databaseName = configuration.GetSection("MongoDBSettings:DatabaseName").Value;
        }

        public Position GetById(string id)
        {
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);
            var collection = db.GetCollection<Position>("positions");
            return collection
                .Find(p => p.Id == id)
                .FirstOrDefault();
        }
    }
}
