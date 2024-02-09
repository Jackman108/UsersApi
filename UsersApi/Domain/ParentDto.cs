using System.Collections.Generic;

namespace UsersApi.Domain
{
    public class ParentDto
    {
        public string Name { get; set; } = string.Empty;
        public List<string> Child { get; set; } = new List<string>();
        public string Created { get; set; } = string.Empty;
    }
}