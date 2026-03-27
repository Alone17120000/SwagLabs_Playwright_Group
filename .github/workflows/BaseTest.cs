using Microsoft.Playwright.NUnit;
using NUnit.Framework;
using System.Threading.Tasks;

namespace Playwwright
{
    public class BaseTest : PageTest
    {
        [SetUp]
        public async Task Setup()
        {
            await Page.GotoAsync("https://www.saucedemo.com/");
            await Page.FillAsync("[data-test='username']", "standard_user");
            await Page.FillAsync("[data-test='password']", "secret_sauce");
            await Page.ClickAsync("[data-test='login-button']");
        }
    }
}