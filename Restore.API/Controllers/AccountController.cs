using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Restore.API.DTO;
using Restore.API.Entities;
using Restore.API.Services;

namespace Restore.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> userManager;
        private readonly TokenService tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await userManager.CheckPasswordAsync(user, loginDTO.Password))
                return Unauthorized();

            return Ok(new UserDTO
            {
                Email = user.Email,
                Token = await tokenService.GenerateToken(user),
            });
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

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            return Ok(new UserDTO
            {
                Email = user.Email,
                Token = await tokenService.GenerateToken(user),
            });
        }
    }
}
