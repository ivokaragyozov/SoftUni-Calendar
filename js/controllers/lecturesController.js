var app = app || {};

app.lecturesController = (function () {
    function LecturesController(model, viewBag) {
        this.model = model;
        this.viewBag = viewBag;
    }


    LecturesController.prototype.loadAllLectures = function (selector) {
        var _this = this;

        this.model.getAllLectures()
            .then(function (results) {
                var data = {
                    lectures: []
                };

                results.forEach(function (lecture) {
                    data.lectures.push({
                        _id: lecture._id,
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer
                    });
                });

                _this.viewBag.showAllLectures(selector, data);
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };
    LecturesController.prototype.loadMyLectures = function (selector) {
        var _this = this,
            userId = sessionStorage['userId'];

        this.model.getMyLectures(userId)
            .then(function (results) {
                var data = {
                    lectures: []
                };

                results.forEach(function (lecture) {
                    data.lectures.push({
                        _id: lecture._id,
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer
                    });
                });

                _this.viewBag.showMyLectures(selector, data);
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };
    LecturesController.prototype.loadAddLecturePage = function (selector) {
        this.viewBag.showAddLecturePage(selector);
    };
    LecturesController.prototype.addLecture = function (data) {
        this.model.addLecture(data)
            .then(function (result) {
                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/calendar/my/' });
                });

                Noty.success('Lecture added successfully', 'top');
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };
    LecturesController.prototype.loadEditLecturePage = function (selector, data) {
        this.viewBag.showEditLecturePage(selector, data);
    };
    LecturesController.prototype.editLecture = function (data) {
        this.model.editLecture(data)
            .then(function (result) {
                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/calendar/my/' });
                });

                Noty.success('Lecture edited successfully!', 'top');
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };
    LecturesController.prototype.loadDeleteLecturePage = function (selector, data) {
        this.viewBag.showDeleteLecturePage(selector, data);
    };
    LecturesController.prototype.deleteLecture = function (lectureId) {
        this.model.deleteLecture(lectureId)
            .then(function (result) {
                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/calendar/my/' });
                });

                Noty.success('Lecture deleted successfully!', 'top');
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };


    return {
        load: function (model, viewBag) {
            return new LecturesController(model, viewBag);
        }
    }
}());