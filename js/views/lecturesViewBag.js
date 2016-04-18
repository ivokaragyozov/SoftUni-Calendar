var app = app || {};

app.lecturesViewBag = (function () {
    function showAllLectures (selector, data) {
        $.get('templates/calendar.html', function (templ) {
            $(selector).html(templ);
            $('#editLecture').hide();
            $('#deleteLecture').hide();
        }).then(function (resTempl) {
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data.lectures,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', { url: '#/calendar/add/' });
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                    });
                    $('#events-modal').modal();
                }
            });
        });
    }
    function showMyLectures (selector, data) {
        $.get('templates/calendar.html', function (templ) {
            $(selector).html(templ);
        }).then(function (resTempl) {
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data.lectures,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', { url: '#/calendar/add/' });
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function () {
                            Sammy(function () {
                                calEvent.url = '#/calendar/edit/';
                                this.trigger('redirectUrl', calEvent);
                            });
                        });
                        $('#deleteLecture').on('click', function () {
                            Sammy(function () {
                                calEvent.url = '#/calendar/delete/'
                                this.trigger('redirectUrl', calEvent);
                            });
                        })
                    });
                    $('#events-modal').modal();
                }
            });

        });
    }
    function showAddLecturePage (selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);

            $('#addLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    lecturer = sessionStorage['username'];

                if (start.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g) && end.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g)) {
                    var data = {
                        title: title,
                        start: start,
                        end: end,
                        lecturer: lecturer
                    };

                    Sammy(function () {
                        this.trigger('addLecture', data);
                    });
                }
            });
        });
    }
    function showEditLecturePage (selector, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#editLecture').on('click', function (event) {
                var lectureId = data._id,
                    title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    lecturer = sessionStorage['username'];

                var data1 = {
                    _id: lectureId,
                    title: title,
                    start: start,
                    end: end,
                    lecturer: lecturer
                }

                Sammy(function () {
                    this.trigger('editLecture', data1);
                });
            });
        }).then(function (success) {
            $('#events-modal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();;
        }).done();
    }
    function showDeleteLecturePage(selector, data) {
        $.get('templates/delete-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#deleteLecture').on('click', function () {
                var lectureId = data._id;

                Sammy(function () {
                    this.trigger('deleteLecture', lectureId);
                });
            });
        }).then(function (success) {
            $('#events-modal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();;
        }).done();
    }

    return {
        load: function () {
            return {
                showAllLectures: showAllLectures,
                showMyLectures: showMyLectures,
                showAddLecturePage: showAddLecturePage,
                showEditLecturePage: showEditLecturePage,
                showDeleteLecturePage: showDeleteLecturePage
            }
        }
    }
}());