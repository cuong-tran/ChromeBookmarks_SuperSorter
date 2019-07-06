$(function () {
    console && console.log && console.log("Options script.");
    $("#saveButton").click(function () {
        console && console.log && console.log("Saving.");
        Options.save()
    });
    $("#restoreDefaultsButton").click(function () {
        console && console.log && console.log("Restoring defaults.");
        Options.restoreDefaults()
    });
    $("#deDupeGlobalButton").click(function () {
        DuplicateView.refreshList($("#dupeDisplay")[0])
    });
    $("#dupeDisplay").on("click", "#selectAllButFirstInEachGroup", function () {
        DuplicateView.selectAllButFirstPerGroup($("#dupeDisplay")[0])
    });
    $("#dupeDisplay").on("click", "#selectAllButLastInEachGroup", function () {
        DuplicateView.selectAllButLastPerGroup($("#dupeDisplay")[0])
    });
    $("#dupeDisplay").on("click", "#invertSelection", function () {
        DuplicateView.invertSelection($("#dupeDisplay")[0])
    });
    $("#dupeDisplay").on("click", "#refreshDuplicates", function () {
        DuplicateView.refreshList($("#dupeDisplay")[0])
    });
    $("#dupeDisplay").on("click", "#globalDeDupeButton", function () {
        DuplicateView.confirmDeletion($("#dupeDisplay")[0])
    });
    $("#dupeDisplay").on("click",
        "#confirmButton",
        function () {
            DuplicateView.deleteDuplicates($("#dupeDisplay")[0])
        });
    $("#dupeDisplay").on("click", "#cancelButton", function () {
        DuplicateView.hideConfirmCancelButtons($("#dupeDisplay")[0])
    });
    $("#dupeDisplay").on("click", "#hideButton", function () {
        DuplicateView.hide($("#dupeDisplay")[0])
    });
    Options.restore()
});