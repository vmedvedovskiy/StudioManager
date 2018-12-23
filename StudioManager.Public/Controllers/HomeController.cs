using Microsoft.AspNetCore.Mvc;

namespace StudioManager.Public.Controllers
{
    [Route("[controller]")]
    public class HomeController : Controller
    {
        [Route("[action]")]
        public IActionResult Index()
        {
            return View();
        }
    }
}