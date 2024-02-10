using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;

namespace UsersApi.Domain
{
    public interface IPositionService
    {
        Position GetById(string id);
    }
    public class PositionService : IPositionService
    {
        private readonly string _connectionString;
        private readonly string _databaseName;

        public PositionService(IConfiguration configuration)
        {
            _connectionString = configuration.GetSection("MongoDBSettings:ConnectionString").Value;
            _databaseName = configuration.GetSection("MongoDBSettings:DatabaseName").Value;
            if (string.IsNullOrEmpty(_connectionString) || string.IsNullOrEmpty(_databaseName))
            {
                throw new InvalidOperationException("Ошибка: Не удается получить настройки для подключения к MongoDB.");
            }
        }

        public Position GetById(string id)
        {
            try
            {
                var client = new MongoClient(_connectionString);
                var db = client.GetDatabase(_databaseName);
                var collection = db.GetCollection<Position>("positions");

                if (client.Cluster.Description.State == MongoDB.Driver.Core.Clusters.ClusterState.Disconnected)
                {
                    throw new InvalidOperationException("Ошибка: Не удалось подключиться к MongoDB.");
                }

                return collection
                    .Find(p => p.Id == id)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Ошибка при получении данных из MongoDB: {ex.Message}");
            }
        }
    }
}
