using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudioManager.Database;
using StudioManager.Services;
using StudioManager.Services.Impl;

namespace StudioManager
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddEntityFrameworkNpgsql()
               .AddDbContextPool<StudioContext>(
                    _ => _.UseNpgsql(this.Configuration["ConnectionString"]))
               .BuildServiceProvider();

            var mappingConfig = new MapperConfiguration(
                _ => _.AddProfile<BookingMapping>());

            services
                .AddTransient<IBookingQueryService, BookingQueryService>()
                .AddTransient<IBookingCommandService, BookingCommandService>()
                .AddSingleton(mappingConfig.CreateMapper());
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}
