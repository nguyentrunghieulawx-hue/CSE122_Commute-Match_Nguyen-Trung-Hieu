document.addEventListener("DOMContentLoaded", function () {

  function nhanTrangThai(chu, loai) {
    return '<span class="cm-badge ' + (loai || "") + '">' + chu + "</span>";
  }

  var hopThongBao = document.getElementById("cmToast");
  function hienThongBao(noiDung) {
    if (!hopThongBao) return;
    hopThongBao.textContent = noiDung || "Đã cập nhật thành công";
    hopThongBao.classList.add("cm-toast-hien");
    setTimeout(function () {
      hopThongBao.classList.remove("cm-toast-hien");
    }, 2300);
  }

  document.getElementById("nhomTab").addEventListener("click", function (e) {
    var tab = e.target.closest(".cm-tab");
    if (!tab) return;

    this.querySelectorAll(".cm-tab").forEach(function (t) {
      t.classList.remove("active");
    });
    tab.classList.add("active");
  });

  document.addEventListener("click", function (e) {
    var nut = e.target.closest("[data-viec]");
    if (!nut) return;
    var viec = nut.dataset.viec;

    if (viec === "duyet" || viec === "tu-choi") {
      var the = nut.closest(".cm-yeu-cau");
      the.querySelector(".cm-actions").innerHTML = viec === "duyet"
        ? nhanTrangThai("Đã duyệt")
        : nhanTrangThai("Đã từ chối", "cm-badge-red");

      var cot = the.closest("[data-muc-loc]");
      if (cot) cot.dataset.mucLoc = viec === "duyet" ? "duyet" : "tu-choi";
      if (window.CMCapNhatHienThi) window.CMCapNhatHienThi();

      hienThongBao(viec === "duyet" ? "Đã duyệt yêu cầu" : "Đã từ chối yêu cầu");
    }
  });
});
