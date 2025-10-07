using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;
        public CartController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            return CartToDto(await GetOrCreate());
        }

        [HttpPost]
        public async Task<IActionResult> AddItemToCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();
            var product = await _context.Products.FirstOrDefaultAsync(s => s.Id == productId);
            if (product == null)
                return NotFound("The product is not in the database");
            cart.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return CreatedAtAction(nameof(GetCart), CartToDto(cart));
            return BadRequest(new ProblemDetails
            {
                Title = "The product can not be added to cart"
            });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteItemFromCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();

            cart.DeleteItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return CreatedAtAction(nameof(GetCart), CartToDto(cart));
            return BadRequest(new ProblemDetails
            {
                Title = "The product can not be removed from cart"
            });
        }

        private async Task<Cart> GetOrCreate()
        {
            var cart = await _context.Carts.Include(s => s.CartItems).ThenInclude(s => s.Product).FirstOrDefaultAsync(s => s.CustomerId == Request.Cookies["customerId"]);
            if (cart == null)
            {
                var customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true
                };
                Response.Cookies.Append("customerId", customerId, cookieOptions);
                cart = new Cart { CustomerId = customerId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            return cart;
        }

        private CartDTO CartToDto(Cart cart)
        {
            return new CartDTO
            {
                CartId = cart.CartId,
                CustomerId = cart.CustomerId,
                CartItems = cart.CartItems.Select(ci => new CartItemDTO
                {
                    ProductId = ci.ProductId,
                    Name = ci.Product.Name,
                    Price = ci.Product.Price,
                    ImageUrl = ci.Product.ImageUrl,
                    Quantity = ci.Quantity
                }).ToList()
            };
        }
    }
}
