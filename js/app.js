var app = app || {};

(function () {
    var router = Sammy(function () {
        var requester = app.requester.load('kid_ZyNaHs4T1W', '8e670383cd6c43c0bb3a15438b16bee4', 'https://baas.kinvey.com/'),
            selector = '#container',
            selectorMenu = '#menu';

        var userModel = app.userModel.load(requester),
            lecturesModel = app.lecturesModel.load(requester);

        var userViewBag = app.userViewBag.load(),
            homeViewBag = app.homeViewBag.load(),
            lecturesViewBag = app.lecturesViewBag.load();

        var userController = app.userController.load(userModel, userViewBag),
            homeController = app.homeController.load(homeViewBag),
            lecturesController = app.lecturesController.load(lecturesModel, lecturesViewBag);

        /*this.before({ except: { path: '#\/(login\/|register\/)?' } }, function () {
            if (!sessionStorage['sessionToken']) {
                this.redirect('#/');
                return false;
            }
        });*/

        this.bind('redirectUrl', function (ev, data) {
            this.redirect(data.url, data);
        });
        this.bind('login', function (ev, data) {
            userController.login(data);
        });
        this.bind('register', function (ev, data) {
            userController.register(data);
        });
        this.bind('addLecture', function (ev, data) {
            lecturesController.addLecture(data);
        });
        this.bind('editLecture', function (ev, data) {
            lecturesController.editLecture(data);
        });
        this.bind('deleteLecture', function (ev, data) {
            lecturesController.deleteLecture(data);
        });

        this.get('#/', function () {
            if (sessionStorage['sessionId']) {
                homeController.loadHomeMenu(selectorMenu);
                homeController.loadWelcomeUserPage(selector);
            } else {
                homeController.loadLoginMenu(selectorMenu);
                homeController.loadWelcomeGuestPage(selector);
            }
        });
        this.get('#/login/', function () {
            userController.loadLoginPage(selector);
        });
        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });
        this.get('#/_logout/', function () {
            userController.logout();
        });
        this.get('#/calendar/list/', function () {
            homeController.loadHomeMenu(selectorMenu);
            lecturesController.loadAllLectures(selector);
        });
        this.get('#/calendar/my/', function () {
            homeController.loadHomeMenu(selectorMenu);
            lecturesController.loadMyLectures(selector);
        });
        this.get('#/calendar/add/', function () {
            lecturesController.loadAddLecturePage(selector);
        });
        this.get('#/calendar/edit/', function (data) {
            lecturesController.loadEditLecturePage(selector, data.params);
        });
        this.get('#/calendar/delete/', function (data) {
            lecturesController.loadDeleteLecturePage(selector, data.params);
        });
    });

    router.run('#/');
}());