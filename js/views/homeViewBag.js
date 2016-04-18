var app = app || {};

app.homeViewBag = (function () {
    function showWelcomeGuestPage (selector) {
        $.get('templates/welcome-guest.html', function (templ) {
            $(selector).html(templ);
        });
    }
    function showLoginMenu (selector) {
        $.get('templates/menu-login.html', function (templ) {
            $(selector).html(templ);
        });
    }
    function showWelcomeUserPage (selector) {
        $.get('templates/welcome-user.html', function (templ) {
            var username = sessionStorage['username'],
                rendered = Mustache.render(templ, {username: username});
            $(selector).html(rendered);
        });
    }
    function showHomeMenu (selector) {
        $.get('templates/menu-home.html', function (templ) {
            $(selector).html(templ);
        });
    }

    return {
        load: function () {
            return {
                showWelcomeGuestPage: showWelcomeGuestPage,
                showLoginMenu: showLoginMenu,
                showWelcomeUserPage: showWelcomeUserPage,
                showHomeMenu: showHomeMenu
            }
        }
    }
}());