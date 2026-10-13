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

    var buocLayMa = document.getElementById("buocLayMa");
    var khoiOtp = document.getElementById("khoiOtp");
    var oEmail = document.getElementById("oEmail");
    var oEmailNhanMa = document.getElementById("oEmailNhanMa");
    var oMaOtpHien = document.getElementById("oMaOtpHien");
    var oMaOtp = document.getElementById("oMaOtp");
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

    function guiMaOtp() {
        maOtpHienTai = taoMaOtp();
        oMaOtpHien.textContent = maOtpHienTai;
        oMaOtp.value = "";
        anLoiOtp();
        batDauDemNguoc();
        oMaOtp.focus();
        hienThongBao("Đã gửi mã OTP tới " + oEmailNhanMa.textContent);
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

    function hienBuocOtp() {
        buocLayMa.classList.add("d-none");
        khoiOtp.classList.remove("d-none");
    }

    function hienBuocLayMa() {
        dungDemNguoc();
        anLoiOtp();
        khoiOtp.classList.add("d-none");
        buocLayMa.classList.remove("d-none");
    }

    oMaOtp.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").slice(0, 6);
        if (!oOtpLoi.classList.contains("d-none")) anLoiOtp();
    });

    document.querySelector('[data-viec="lay-ma"]').addEventListener("click", function() {
        if (oEmail.value.trim().indexOf("@") < 0) {
            hienThongBao("Email chưa đúng, bạn kiểm tra lại nhé");
            oEmail.focus();
            return;
        }

        oEmailNhanMa.textContent = oEmail.value.trim();
        hienBuocOtp();
        guiMaOtp();
    });

    document.querySelector('[data-viec="gui-lai-otp"]').addEventListener("click", function() {
        guiMaOtp();
    });

    document.querySelector('[data-viec="huy-otp"]').addEventListener("click", function() {
        hienBuocLayMa();
    });

    document.querySelector('[data-viec="xac-nhan-otp"]').addEventListener("click", function() {
        var maNhap = oMaOtp.value.trim();

        if (maNhap.length < 6) {
            hienLoiOtp("Vui lòng nhập đủ 6 chữ số của mã OTP.");
            return;
        }
        if (maNhap !== maOtpHienTai) {
            hienLoiOtp("Mã OTP chưa đúng. Bạn xem lại mã ở khung thư màu xanh phía trên.");
            return;
        }

        dungDemNguoc();
        anLoiOtp();
        sessionStorage.setItem("cmOtpDatLai", maOtpHienTai);
        hienThongBao("Xác nhận mã thành công, đang chuyển trang...");
        setTimeout(function() {
            location.href = denTrang("reset-password");
        }, 900);
    });
});
