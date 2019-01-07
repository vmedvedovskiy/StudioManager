using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace StudioManager.Public.Middleware
{
    public class ApiProxyMiddleware : IMiddleware
    {
        private const int BufferSize = 81920;
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
                var request = context.Request;

                var uri = new UriBuilder(client.BaseAddress)
                {
                    Query = request.QueryString.Value.Trim('?')
                };

                uri.Path += request.PathBase
                    .Add(request.Path)
                    .ToUriComponent();

                var message = new HttpRequestMessage(
                    new HttpMethod(request.Method),
                    uri.Uri);

                request.Headers
                    .ToList()
                    .ForEach(_ =>
                        message.Headers.TryAddWithoutValidation(_.Key, string.Join(',', _.Value)));

                if (HasBody(request))
                {
                    using (var stream = new MemoryStream())
                    {
                        await request.Body.CopyToAsync(stream)
                            .ConfigureAwait(false);

                        message.Content = new StringContent(
                            Encoding.UTF8.GetString(stream.ToArray()),
                            Encoding.UTF8,
                            request.ContentType);
                    }
                }

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
                        BufferSize,
                        context.RequestAborted)
                    .ConfigureAwait(false);
                }
            }
        }

        private static bool HasBody(HttpRequest request) => StringComparer.InvariantCultureIgnoreCase
                            .Compare(request.Method, HttpMethod.Post.Method) == 0
                            || StringComparer.InvariantCultureIgnoreCase
                            .Compare(request.Method, HttpMethod.Put.Method) == 0
                            || StringComparer.InvariantCultureIgnoreCase
                            .Compare(request.Method, HttpMethod.Patch.Method) == 0;
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
