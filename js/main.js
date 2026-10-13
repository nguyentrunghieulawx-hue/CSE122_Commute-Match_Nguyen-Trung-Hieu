document.addEventListener("DOMContentLoaded", function () {

  var hopThongBao = document.getElementById("cmToast");
  var henAnThongBao = null;
  function hienThongBao(noiDung) {
    if (!hopThongBao) return;
    hopThongBao.textContent = noiDung || "Đã cập nhật thành công";
    hopThongBao.classList.add("cm-toast-hien");
    clearTimeout(henAnThongBao);
    henAnThongBao = setTimeout(function () {
      hopThongBao.classList.remove("cm-toast-hien");
    }, 2300);
  }
  window.CMThongBao = hienThongBao;

  var oTim = document.querySelector("[data-tim-kiem]");
  var nhomLoc = document.querySelector("[data-nhom-loc]");

  function capNhatHienThi() {
    var tuKhoa = oTim ? oTim.value.trim().toLowerCase() : "";
    var tabActive = nhomLoc ? nhomLoc.querySelector("[data-loc].active") : null;
    var giaTriLoc = tabActive ? tabActive.dataset.loc : "tat-ca";

    var danhSach = document.querySelectorAll("[data-muc-loc], [data-tim-duoc]");
    var demHien = 0;

    danhSach.forEach(function (muc) {
      var okLoc = !muc.hasAttribute("data-muc-loc") ||
        giaTriLoc === "tat-ca" ||
        muc.dataset.mucLoc === giaTriLoc;
      var okTim = !muc.hasAttribute("data-tim-duoc") ||
        !tuKhoa ||
        muc.textContent.toLowerCase().indexOf(tuKhoa) >= 0;

      var duocHien = okLoc && okTim;
      muc.classList.toggle("d-none", !duocHien);
      if (duocHien) demHien++;
    });

    var baoTrong = document.querySelector("[data-bao-trong]");
    if (baoTrong) baoTrong.classList.toggle("d-none", demHien > 0);

    if (nhomLoc) {
      nhomLoc.querySelectorAll("[data-loc]").forEach(function (tab) {
        if (!tab.hasAttribute("data-ten")) return;
        var giaTri = tab.dataset.loc;
        var dem = giaTri === "tat-ca"
          ? document.querySelectorAll("[data-muc-loc]").length
          : document.querySelectorAll('[data-muc-loc="' + giaTri + '"]').length;
        tab.textContent = tab.dataset.ten + " " + dem;
      });
    }
  }
  window.CMCapNhatHienThi = capNhatHienThi;

  if (oTim) oTim.addEventListener("input", capNhatHienThi);

  if (nhomLoc) {
    nhomLoc.addEventListener("click", function (e) {
      var tab = e.target.closest("[data-loc]");
      if (!tab) return;
      nhomLoc.querySelectorAll("[data-loc]").forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");
      capNhatHienThi();
    });
  }

  var nutCho = null;

  if (document.querySelector("[data-xac-nhan]") && !document.getElementById("cmXacNhan")) {
    var khoiHop = document.createElement("div");
    khoiHop.innerHTML =
      '<div class="modal fade" id="cmXacNhan" tabindex="-1" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered">' +
          '<div class="modal-content">' +
            '<div class="modal-header">' +
              '<h5 class="modal-title" id="cmXacNhanTieuDe">Xác nhận</h5>' +
              '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>' +
            '</div>' +
            '<div class="modal-body">' +
              '<p class="mb-0" id="cmXacNhanCauHoi"></p>' +
              '<div class="mt-3 d-none" id="cmXacNhanNhapKhoi">' +
                '<label class="form-label" for="cmXacNhanNhap"></label>' +
                '<textarea class="form-control" id="cmXacNhanNhap" rows="2"></textarea>' +
                '<p class="text-danger small mb-0 mt-1 d-none" id="cmXacNhanLoi"></p>' +
              '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button type="button" class="btn cm-btn cm-btn-soft" data-bs-dismiss="modal">Hủy</button>' +
              '<button type="button" class="btn cm-btn cm-btn-gradient" id="cmXacNhanDongY">Đồng ý</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(khoiHop.firstElementChild);
  }

  document.addEventListener("click", function (e) {
    var nut = e.target.closest("[data-xac-nhan]");
    if (!nut) return;

    nutCho = nut;
    document.getElementById("cmXacNhanTieuDe").textContent = nut.dataset.xacNhanTieuDe || "Xác nhận";
    document.getElementById("cmXacNhanCauHoi").textContent = nut.dataset.xacNhan;

    var nutDongY = document.getElementById("cmXacNhanDongY");
    nutDongY.className = "btn cm-btn " +
      (nut.dataset.xacNhanLoai === "nguy-hiem" ? "cm-btn-danger" : "cm-btn-gradient");

    var nhapKhoi = document.getElementById("cmXacNhanNhapKhoi");
    var oNhap = document.getElementById("cmXacNhanNhap");
    var baoLoi = document.getElementById("cmXacNhanLoi");
    if (nut.dataset.xacNhanNhap) {
      nhapKhoi.classList.remove("d-none");
      nhapKhoi.querySelector("label").textContent = nut.dataset.xacNhanNhap;
      oNhap.value = "";
      baoLoi.classList.add("d-none");
    } else {
      nhapKhoi.classList.add("d-none");
    }

    if (window.bootstrap) {
      bootstrap.Modal.getOrCreateInstance(document.getElementById("cmXacNhan")).show();
    }
  });

  var nutDongY = document.getElementById("cmXacNhanDongY");
  if (nutDongY) {
    nutDongY.addEventListener("click", function () {
      if (!nutCho) return;
      var nut = nutCho;

      var lyDo = "";
      var nhapKhoi = document.getElementById("cmXacNhanNhapKhoi");
      var oNhap = document.getElementById("cmXacNhanNhap");
      var baoLoi = document.getElementById("cmXacNhanLoi");
      if (nhapKhoi && !nhapKhoi.classList.contains("d-none")) {
        lyDo = oNhap.value.trim();
        if (!lyDo && nut.hasAttribute("data-bat-buoc")) {
          baoLoi.textContent = "Vui lòng nhập nội dung này.";
          baoLoi.classList.remove("d-none");
          oNhap.focus();
          return;
        }
      }

      var hop = document.getElementById("cmXacNhan");
      if (window.bootstrap && hop) bootstrap.Modal.getInstance(hop).hide();

      var hanhDong = nut.dataset.hanhDong || "";

      if (hanhDong === "xoa") {
        var bia = nut.closest(nut.dataset.xoaKhoi || ".cm-row");
        if (bia) bia.remove();
      }

      if (hanhDong === "doi-trang-thai") {
        var cumNut = nut.closest(".cm-actions");
        if (cumNut) {
          cumNut.innerHTML = '<span class="cm-badge ' +
            (nut.dataset.trangThaiLoai || "") + '">' + nut.dataset.trangThaiMoi + "</span>";
          if (lyDo && nut.hasAttribute("data-hien-ly-do")) {
            var dongLyDo = document.createElement("p");
            dongLyDo.className = "cm-ly-do small fst-italic mb-0 mt-2";
            dongLyDo.textContent = "Lý do: " + lyDo;
            cumNut.parentElement.insertBefore(dongLyDo, cumNut);
          }
        }
      }

      if (hanhDong === "doi-trang-thai" || hanhDong === "doi-huy-hieu") {
        var phamVi = nut.closest("[data-muc-loc]");
        if (phamVi && nut.dataset.mucMoi) phamVi.dataset.mucLoc = nut.dataset.mucMoi;

        if (hanhDong === "doi-huy-hieu") {
          var huyHieu = nut.dataset.huyHieuMuc
            ? document.querySelector(nut.dataset.huyHieuMuc)
            : phamVi && phamVi.querySelector(".cm-badge");
          if (huyHieu) {
            huyHieu.textContent = nut.dataset.huyHieuMoi;
            huyHieu.className = "cm-badge " + (nut.dataset.huyHieuLoai || "");
          }
        }
      }

      if (nut.hasAttribute("data-an-nut")) nut.remove();

      capNhatHienThi();
      hienThongBao(nut.dataset.thongBao || "Đã cập nhật thành công");
      nutCho = null;
    });
  }

  document.addEventListener("click", function (e) {
    var nut = e.target.closest("[data-them-muc]");
    if (!nut) return;

    var nguon = document.querySelector(nut.dataset.themNguon);
    var dich = document.querySelector(nut.dataset.themVao);
    if (!nguon || !dich) return;

    var noiDung = nguon.value.trim();
    if (!noiDung) {
      hienThongBao("Vui lòng nhập nội dung trước.");
      nguon.focus();
      return;
    }

    var muc = document.createElement("div");
    muc.className = "cm-item-row";
    var spanNoiDung = document.createElement("span");
    spanNoiDung.textContent = noiDung;
    muc.appendChild(spanNoiDung);

    if (nut.hasAttribute("data-xoa-muc")) {
      var nutXoa = document.createElement("button");
      nutXoa.type = "button";
      nutXoa.className = "cm-nut-x";
      nutXoa.title = "Xóa mục này";
      nutXoa.setAttribute("data-xoa-muc", "");
      nutXoa.innerHTML = '<i class="bi bi-x-lg"></i>';
      muc.appendChild(nutXoa);
    }

    dich.appendChild(muc);
    nguon.value = "";
    nguon.focus();
    hienThongBao(nut.dataset.thongBao || "Đã thêm mới thành công.");
  });

  document.addEventListener("click", function (e) {
    var nut = e.target.closest("[data-xoa-muc]");
    if (!nut) return;
    var muc = nut.closest(".cm-item-row");
    if (muc) muc.remove();
    hienThongBao("Đã xóa thành công.");
  });

  document.addEventListener("click", function (e) {
    var nut = e.target.closest("[data-doi-giao-dien]");
    if (!nut) return;
    var laToi = document.body.classList.toggle("cm-dark");
    try {
      localStorage.setItem("cmTheme", laToi ? "dark" : "light");
    } catch (loi) { }
    hienThongBao(laToi ? "Đã bật giao diện tối." : "Đã về giao diện sáng.");
  });

  try {
    if (localStorage.getItem("cmTheme") === "dark") document.body.classList.add("cm-dark");
  } catch (loi) { }

  if (nhomLoc || oTim) capNhatHienThi();
});
