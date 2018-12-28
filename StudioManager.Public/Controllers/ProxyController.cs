using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;

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
            using (var client = this.clientFactory.CreateClient("api"))
            {
                var uri = new UriBuilder(client.BaseAddress);

                uri.Path += ("api/" + route);
                uri.Query = this.Request.QueryString.Value.Trim('?');

                var message = new HttpRequestMessage(
                    new HttpMethod(this.Request.Method),
                    uri.Uri);

                this.Request.Headers.ToList()
                    .ForEach(_ 
                        => message.Headers.Add(_.Key, string.Join(',', _.Value)));

                var response = await client.SendAsync(
                    message,
                    HttpCompletionOption.ResponseHeadersRead);

                this.Response.StatusCode = (int)response.StatusCode;
                response.Headers
                    .Concat(response.Content.Headers)
                    .ToList()
                    .ForEach(_ => this.Response.Headers.Add(
                        _.Key, 
                        new StringValues(_.Value.ToArray())));

                var responseContent = await response.Content.ReadAsStreamAsync();

                await responseContent
                        .CopyToAsync(this.Response.Body);

                return new EmptyResult();
            }
        }
    }
}
