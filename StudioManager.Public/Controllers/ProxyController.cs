using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace StudioManager.Public.Controllers
{
    [ApiController]
    [Route("api/{*route}")]
    public class ProxyController : Controller
    {
        private readonly IConfiguration config;
        private readonly IHttpClientFactory clientFactory;

        public ProxyController(IConfiguration config, IHttpClientFactory clientFactory)
        {
            this.config = config;
            this.clientFactory = clientFactory;
        }

        [HttpGet]
        [HttpPost]
        [HttpPut]
        [HttpDelete]
        public async Task<IActionResult> Proxy(string route)
        {
            using (var client = this.clientFactory.CreateClient())
            {
                var message = new HttpRequestMessage(
                    new HttpMethod(this.Request.Method),
                    route);

                this.Request.Headers.ToList()
                    .ForEach(_ 
                        => message.Headers.Add(_.Key, string.Join(',', _.Value)));

                var response = await client.SendAsync(
                    message,
                    HttpCompletionOption.ResponseHeadersRead);

                using (var sw = new StreamWriter(this.Response.Body))
                {
                    await (await response.Content.ReadAsStreamAsync())
                        .CopyToAsync(sw.BaseStream);

                    sw.Close();

                }

                return this.StatusCode((int)response.StatusCode);
            }
        }
    }
}
