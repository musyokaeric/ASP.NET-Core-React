using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Restore.API.DTO;
using Restore.API.Entities;

namespace Restore.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> userManager;

        public AccountController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginDTO loginDTO)
        {
            var user = await userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await userManager.CheckPasswordAsync(user, loginDTO.Password))
                return Unauthorized();

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            var user = new User { UserName = registerDTO.Username, Email = registerDTO.Email };
            var result = await userManager.CreateAsync(user, registerDTO.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                    ModelState.AddModelError(error.Code, error.Description);

                return ValidationProblem();
            }
            await userManager.AddToRoleAsync(user, "Member");
            return Ok();
        }
    }
}
