using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace UsersApi.Domain
{
    public class UserService
    {
        private readonly string _connectionString;
        private readonly string _databaseName;

        public UserService(IConfiguration configuration)
        {
            _connectionString = configuration.GetSection("MongoDBSettings:ConnectionString").Value;
            _databaseName = configuration.GetSection("MongoDBSettings:DatabaseName").Value;
        }

        public List<User> GetAll()
        {
            var client = new MongoClient(_connectionString);
            var db = client.GetDatabase(_databaseName);
            var collection = db.GetCollection<User>("users");
            return collection
                .Find(c => true)
                .ToList();
        }
    }
}
