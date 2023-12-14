using Microsoft.EntityFrameworkCore;
using Restore.API.Data;
using Restore.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DbContext Connection
builder.Services.AddDbContext<StoreContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add CORS service to resolve this browser error:
// Access to fetch at 'https://localhost:7263/api/products' from origin 'http://localhost:3000' has been blocked
// by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.

// Exception handling middleware
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS Middleware
app.UseCors(options =>
{
    options.AllowAnyHeader() // Request HTTP headers from the client to our API
    .AllowAnyMethod() // HTTP Methods (GET, PUT, POST, DELETE)
    .WithOrigins("http://localhost:3000");
    // .AllowAnyOrigins() // If WithOrigins() does not work
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Seed Products
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    // Creates the database if it does not exist
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occurred during migration.");
}

app.Run();
