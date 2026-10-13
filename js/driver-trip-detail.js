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

  function dongHopThoai() {
    var hop = document.querySelector(".modal.show");
    if (hop && window.bootstrap) {
      bootstrap.Modal.getInstance(hop).hide();
    }
  }

  document.addEventListener("click", function (e) {
    var nut = e.target.closest('[data-viec="luu"]');
    if (!nut) return;

    dongHopThoai();
    hienThongBao();
  });
});
