//UsersApi/Controllers/UsersController.cs
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using UsersApi.Domain;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace UsersApi.Controllers
{
    [ApiController]
    [Route("api/users/")]

    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IPositionService _positionService;
        private readonly ILogger<UsersController> _logger;
        public UsersController(UserService userService, PositionService positionService, ILogger<UsersController> logger)
        {
            _userService = userService;
            _positionService = positionService;
            _logger = logger;
        }

        [Route("list")]
        public IActionResult GetList()
        {
            var response = new UserResponse
            {
                Users = new List<UserDto>()
            };

            try
            {
                var users = _userService.GetAll();
                response.Total = users.Count;
                foreach (var user in users)
                {
                    var dto = new UserDto
                    {
                        Id = user.Id,
                        Login = user.Login,
                        Name = user.Name
                    };
                    try
                    {
                        var position = _positionService.GetById(user.PositionId);
                        dto.Position = position?.Name;
                        dto.DefaultSalary = position?.DefaultSalary ?? 0;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"Ошибка при получении должности для пользователя {user.Id}");
                    }
                    response.Users.Add(dto);
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении списка пользователей");
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }
    }
}