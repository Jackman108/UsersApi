namespace UsersApi.Domain
{
    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string Login { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal DefaultSalary { get; set; }
        public string Position { get; set; }
    }
}