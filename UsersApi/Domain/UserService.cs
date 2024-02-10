using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;

namespace UsersApi.Domain
{
    public interface IUserService
    {
        List<User> GetAll();
    }

    public class UserService : IUserService
    {
        private readonly string _connectionString;
        private readonly string _databaseName;

        public UserService(IConfiguration configuration)
        {
            _connectionString = configuration.GetSection("MongoDBSettings:ConnectionString").Value;
            _databaseName = configuration.GetSection("MongoDBSettings:DatabaseName").Value;
            if (string.IsNullOrEmpty(_connectionString) || string.IsNullOrEmpty(_databaseName))
            {
                Console.WriteLine("Ошибка: Не удается получить настройки для подключения к MongoDB.");
                throw new InvalidOperationException("Ошибка: Не удается получить настройки для подключения к MongoDB.");
            }
        }

        public List<User> GetAll()
        {
            try
            {
                var client = new MongoClient(_connectionString);
                var db = client.GetDatabase(_databaseName);
                var collection = db.GetCollection<User>("users");

                if (client.Cluster.Description.State == MongoDB.Driver.Core.Clusters.ClusterState.Disconnected)
                {
                    throw new InvalidOperationException("Ошибка: Не удалось подключиться к MongoDB.");
                }

                return collection
                    .Find(c => true)
                    .ToList();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Ошибка при получении данных из MongoDB: {ex.Message}");
            }
        }

    }
}
