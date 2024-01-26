using Microsoft.AspNetCore.Identity;

namespace Restore.API.Entities
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address { get; set; }
    }

    public class Role : IdentityRole<int> { }
}
