using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restore.API.Data;
using Restore.API.DTO;
using Restore.API.Entities;
using Restore.API.Extensions;
using Restore.API.Services;

namespace Restore.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> userManager;
        private readonly TokenService tokenService;
        private readonly StoreContext context;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await userManager.CheckPasswordAsync(user, loginDTO.Password))
                return Unauthorized();

            var userBasket = await RetrieveBasket(loginDTO.Username);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null) context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await context.SaveChangesAsync();
            }

            return Ok(new UserDTO
            {
                Email = user.Email,
                Token = await tokenService.GenerateToken(user),
                Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket.MapBasketToDto()
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

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            var basket = await context.Baskets
                .Include(i => i.Items) // include information about the basket items
                .ThenInclude(p => p.Product) // include information about the products
                .FirstOrDefaultAsync(b => b.BuyerId == buyerId);
            return basket;
        }
    }
}
