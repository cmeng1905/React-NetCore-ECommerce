using API.DTO;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest(new { title = "Kullanıcı adı veya şifre hatalı" });
            }
            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            if (result)
            {
                return Ok(new UserDto{Name=user.Name!, Token = await _tokenService.GenerateToken(user) });
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser(RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new AppUser
            {
                Name=model.Name,
                UserName=model.Username,
                Email=model.Email
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Customer");
                return StatusCode(201);
            }
            return BadRequest(result.Errors);
        }
    }
}
