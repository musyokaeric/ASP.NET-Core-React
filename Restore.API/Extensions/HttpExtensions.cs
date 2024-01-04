using Restore.API.Entities;
using Restore.API.Helpers;
using System.Text.Json;

namespace Restore.API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, Metadata metadata)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            response.Headers.Append("Pagination", JsonSerializer.Serialize(metadata, options));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
