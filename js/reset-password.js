document.addEventListener("DOMContentLoaded", function() {

    var denTrang = function(slug) {
        return slug + ".html";
    };

    var hopThongBao = document.getElementById("cmToast");

    function hienThongBao(noiDung) {
        if (!hopThongBao) return;
        hopThongBao.textContent = noiDung;
        hopThongBao.classList.add("cm-toast-hien");
        setTimeout(function() {
            hopThongBao.classList.remove("cm-toast-hien");
        }, 1600);
    }

    var khoiOtp = document.getElementById("khoiOtp");
    var oMa = document.getElementById("oMa");
    var oMatKhauMoi = document.getElementById("oMatKhauMoi");
    var oNhapLai = document.getElementById("oNhapLai");
    var oMaOtpHien = document.getElementById("oMaOtpHien");
    var oOtpLoi = document.getElementById("oOtpLoi");
    var oNutGuiLai = document.getElementById("oNutGuiLai");
    var oChuGuiLai = document.getElementById("oChuGuiLai");

    var GIAY_CHO_GUI_LAI = 60;
    var maOtpHienTai = "";
    var giayConLai = 0;
    var dongHo = null;

    function taoMaOtp() {
        return String(Math.floor(100000 + Math.random() * 900000));
    }

    function capNhatNutGuiLai() {
        var duocGuiLai = giayConLai <= 0;
        oNutGuiLai.disabled = !duocGuiLai;
        oChuGuiLai.textContent = duocGuiLai ? "Gửi lại mã" : "Gửi lại (" + giayConLai + "s)";
    }

    function dungDemNguoc() {
        if (dongHo) {
            clearInterval(dongHo);
            dongHo = null;
        }
    }

    function batDauDemNguoc() {
        dungDemNguoc();
        giayConLai = GIAY_CHO_GUI_LAI;
        capNhatNutGuiLai();
        dongHo = setInterval(function() {
            giayConLai--;
            if (giayConLai <= 0) dungDemNguoc();
            capNhatNutGuiLai();
        }, 1000);
    }

    function hienLoiOtp(noiDung) {
        oOtpLoi.textContent = noiDung;
        oOtpLoi.classList.remove("d-none");
        khoiOtp.classList.remove("cm-otp-rung");
        void khoiOtp.offsetWidth;
        khoiOtp.classList.add("cm-otp-rung");
    }

    function anLoiOtp() {
        oOtpLoi.textContent = "";
        oOtpLoi.classList.add("d-none");
        khoiOtp.classList.remove("cm-otp-rung");
    }

    function guiMaOtp() {
        maOtpHienTai = taoMaOtp();
        oMaOtpHien.textContent = maOtpHienTai;
        oMa.value = "";
        anLoiOtp();
        batDauDemNguoc();
        oMa.focus();
        hienThongBao("Đã gửi lại mã OTP (xem ngay trên màn hình)");
    }

    document.querySelector('[data-viec="gui-lai-otp"]').addEventListener("click", function() {
        guiMaOtp();
    });

    oMa.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").slice(0, 6);
        if (!oOtpLoi.classList.contains("d-none")) anLoiOtp();
    });

    var maTuBuocTruoc = sessionStorage.getItem("cmOtpDatLai");
    sessionStorage.removeItem("cmOtpDatLai");
    maOtpHienTai = /^\d{6}$/.test(maTuBuocTruoc || "") ? maTuBuocTruoc : taoMaOtp();
    oMaOtpHien.textContent = maOtpHienTai;
    batDauDemNguoc();

    document.querySelector('[data-viec="dat-lai"]').addEventListener("click", function() {
        var maNhap = oMa.value.trim();
        var matKhauMoi = oMatKhauMoi.value;

        if (maNhap.length < 6) {
            hienLoiOtp("Vui lòng nhập đủ 6 chữ số của mã OTP.");
            return;
        }
        if (maNhap !== maOtpHienTai) {
            hienLoiOtp("Mã OTP chưa đúng. Bạn xem lại mã ở khung thư màu xanh phía trên.");
            return;
        }
        anLoiOtp();

        if (matKhauMoi.trim().length < 8) {
            hienThongBao("Mật khẩu mới cần ít nhất 8 ký tự");
            oMatKhauMoi.focus();
            return;
        }
        if (matKhauMoi !== oNhapLai.value) {
            hienThongBao("Hai ô mật khẩu chưa giống nhau");
            oNhapLai.focus();
            return;
        }

        dungDemNguoc();
        hienThongBao("Đổi mật khẩu thành công, đang về trang đăng nhập...");
        setTimeout(function() {
            location.href = denTrang("login");
        }, 900);
    });
});
