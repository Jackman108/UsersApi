//UsersApi/Controllers/UsersController.cs
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using UsersApi.Domain;
using Microsoft.Extensions.Configuration;
namespace UsersApi.Controllers
{
    [ApiController]
    [Route("api/users/")]

    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("list")]
        public IActionResult GetList()
        {
            var response = new UserResponse
            {
                Users = new List<UserDto>()
            };

            var userService = new UserService(_configuration);
            var users = userService.GetAll();
            response.Total = users.Count;
            for (int i = 0; i < users.Count; i++)
            {
                var user = users[i];
                var dto = new UserDto
                {
                    Id = user.Id,
                    Login = user.Login,
                    Name = user.Name
                };
                var position = new PositionService(_configuration).GetById(user.PositionId);
                dto.Position = position.Name;
                dto.DefaultSalary = position.DefaultSalary;
                response.Users.Add(dto);
            }
            return Ok(response);
        }
    }
}