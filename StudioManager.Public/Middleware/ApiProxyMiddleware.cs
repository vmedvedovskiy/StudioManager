using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace StudioManager.Public.Middleware
{
    public class ApiProxyMiddleware : IMiddleware
    {
        private readonly IHttpClientFactory clientFactory;

        public ApiProxyMiddleware(IHttpClientFactory clientFactory)
        {
            this.clientFactory = clientFactory;
        }

        public async Task InvokeAsync(
            HttpContext context,
            RequestDelegate next)
        {
            using (var client = this.clientFactory.CreateClient("api"))
            {
                var uri = new UriBuilder(client.BaseAddress)
                {
                    Query = context.Request.QueryString.Value.Trim('?')
                };

                uri.Path += context.Request.PathBase
                    .Add(context.Request.Path)
                    .ToUriComponent();

                var message = new HttpRequestMessage(
                    new HttpMethod(context.Request.Method),
                    uri.Uri);

                context.Request.Headers
                    .ToList()
                    .ForEach(_ =>
                        message.Headers.Add(_.Key, string.Join(',', _.Value)));

                var apiResponse = await client.SendAsync(
                    message,
                    HttpCompletionOption.ResponseHeadersRead)
                .ConfigureAwait(false);

                context.Response.StatusCode = (int)apiResponse.StatusCode;
                apiResponse.Headers
                    .Concat(apiResponse.Content.Headers)
                    .ToList()
                    .ForEach(_ => context.Response.Headers.Add(
                        _.Key,
                        new StringValues(_.Value.ToArray())));

                context.Response.Headers.Remove("transfer-encoding");

                using (var responseStream = await apiResponse.Content
                    .ReadAsStreamAsync()
                    .ConfigureAwait(false))
                {
                    await responseStream.CopyToAsync(
                        context.Response.Body, 
                        81920, 
                        context.RequestAborted)
                    .ConfigureAwait(false);
                }
            }
        }
    }

    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseApiProxyMiddleware(
            this IApplicationBuilder app)
            => app.Map(
                "/api",
                _ => _.UseMiddleware<ApiProxyMiddleware>());
    }
}
