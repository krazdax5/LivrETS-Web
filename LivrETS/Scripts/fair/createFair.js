﻿var FairStep = function (Id, StartDateTime, EndDateTime, CodeStep, Place) {
    this.Id = Id;
    this.StartDateTime = StartDateTime;
    this.EndDateTime = EndDateTime;
    this.CodeStep = CodeStep;
    this.Place = Place;
}

$(function () {
    $(".date").datetimepicker({
        locale: "fr-ca",
        format: 'MM/DD/YYYY',
        minDate: new Date()
    });

    $("#btn-add-activity").on("click", function () {
        var $elt = $("#add-activity").clone()
            .removeAttr("id")
            .addClass("add-activity")
            .removeClass("hide")
            .appendTo("#grp-activity");

        $("#grp-activity").find(".date").datetimepicker({
            locale: "fr-ca",
            minDate: new Date()
        });
    });

    $("#grp-activity").on("click", ".btn-del-activity", function () {
        var $me = $(this);
        $me.parents(".add-activity").remove();
    });



    $("#btn-submit").on("click", function () {
        var $btn = $(this);
        var alert = $("#group-alert-mess");
        $loading = $btn.find(".fa-spinner");
        $loading.removeClass("hide");
        alert.addClass("hide");
        $btn.prop("disabled", true);

        var session = $("#session").val();
        var steps = [];
        $(".add-activity").each(function () {
            var $me = $(this)
            var act_start_date = $me.find(".activity_start_date").val();
            var act_end_date = $me.find(".activity_end_date").val();
            var act_activity = $me.find(".activity_activity").val();
            var act_place = $me.find(".activity_place").val();
            var act_Id = "-1";

            var my_step = new FairStep(act_Id, act_start_date, act_end_date, act_activity, act_place);
            steps.push(JSON.stringify(my_step));

        });

        $.ajax({
            method: "POST",
            dataType: "json",
            url: "/Admin/CreateFairSubmit",
            data: {
                session: session, steps: steps
            },
            success: function (data) {
                $loading.addClass("hide");
                alert.removeClass("hide");
                $btn.prop("disabled", false);
                if (data.status == 1) {
                    alert
                        .find("#alert-mess")
                        .html(data.message);
                } else {
                    alert.removeClass("alert-success")
                        .addClass("alert-danger")
                        .find("#alert-mess")
                        .html(data.message);
                }
            },
            statusCode: {
                500: function () {
                    $("#alert-mess").removeClass("alert-success")
                        .addClass("alert-danger")
                        .find("#alert-mess")
                        .html("erreur");
                },
                409: function () {
                    $("#alert-mess").removeClass("alert-success")
                        .addClass("alert-danger")
                        .find("#alert-mess")
                        .html("erreur");
                }
            }
        })
    });


});