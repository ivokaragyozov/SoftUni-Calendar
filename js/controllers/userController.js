var app = app || {};

app.userController = (function () {
    function UserController(model, viewBag) {
        this.model = model;
        this.viewBag = viewBag;
    }

    UserController.prototype.loadLoginPage = function (selector) {
        this.viewBag.showLoginPage(selector);
    };
    UserController.prototype.login = function (data) {
        this.model.login(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/' });
                });

                Noty.success('Legged successfully!', 'top');
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };
    UserController.prototype.loadRegisterPage = function (selector) {
        this.viewBag.showRegisterPage(selector);
    };
    UserController.prototype.register = function (data) {
        this.model.register(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/' });
                });

                Noty.success('Registered successfully!', 'top');
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };
    UserController.prototype.logout = function () {
        this.model.logout()
            .then(function () {
                sessionStorage.clear();

                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/' });
                });

                Noty.success('Logout successfully!', 'top');
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };

    return {
        load: function (model, viewBag) {
            return new UserController(model, viewBag);
        }
    }
}());