document.addEventListener("DOMContentLoaded", function () {

  var hopThongBao = document.getElementById("cmToast");
  function hienThongBao(noiDung) {
    if (!hopThongBao) return;
    hopThongBao.textContent = noiDung || "Đã cập nhật thành công";
    hopThongBao.classList.add("cm-toast-hien");
    setTimeout(function () {
      hopThongBao.classList.remove("cm-toast-hien");
    }, 2300);
  }

  document.addEventListener("click", function (e) {
    var nut = e.target.closest("[data-viec]");
    if (!nut) return;

    if (nut.dataset.viec === "luu") {
      hienThongBao();
    }
  });
});
