using System.Collections.Generic;

namespace UsersApi.Domain
{
    public class UserResponse
    {
        public int Total { get; set; }
        public List<UserDto> Users { get; set; }
    }
}