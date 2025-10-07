using API.Entity;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class SeedDatabase
    {
        public static async void Initialize(IApplicationBuilder app)
        {
            var userManager = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
            if (!roleManager.Roles.Any())
            {
                var customer = new AppRole { Name = "Customer" };
                var admin = new AppRole { Name = "Admin" };
                await roleManager.CreateAsync(customer);
                await roleManager.CreateAsync(admin);
            }

            if (!userManager.Users.Any())
            {
                var customer = new AppUser { Name = "Test User", UserName = "testuser", Email = "testuser@gm.com" };
                var admin = new AppUser { Name = "Admin User", UserName = "adminuser", Email = "adminuser@gm.com" };
                if(!userManager.Users.Any(s=>s.UserName== customer.UserName))
                {
                    var res = await userManager.CreateAsync(customer, "Password_123");
                    await userManager.AddToRoleAsync(customer, "Customer");
                }

                if (!userManager.Users.Any(s => s.UserName == admin.UserName))
                {
                    var res = await userManager.CreateAsync(admin, "Admin_123");
                    await userManager.AddToRolesAsync(admin, new[] { "Admin", "Customer" });
                }
            }
        }
    }
}
