var app = app || {};

app.homeController = (function () {
    function HomeController(viewBag) {
        this.viewBag = viewBag;
    }

    HomeController.prototype.loadWelcomeGuestPage = function (selector) {
        this.viewBag.showWelcomeGuestPage(selector);
    }
    HomeController.prototype.loadLoginMenu = function (selector) {
        this.viewBag.showLoginMenu(selector);
    }
    HomeController.prototype.loadWelcomeUserPage = function (selector) {
        this.viewBag.showWelcomeUserPage(selector);
    }
    HomeController.prototype.loadHomeMenu = function (selector) {
        this.viewBag.showHomeMenu(selector);
    }

    return {
        load: function (viewBag) {
            return new HomeController(viewBag);
        }
    };
}());