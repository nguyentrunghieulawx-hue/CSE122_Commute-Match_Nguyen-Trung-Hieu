## 1. Tên đề tài

**CommuteMatch – Ghép chuyến đi chung cho cộng đồng**

---

## 2. Tên các trang đã thực hiện

Project gồm 9 trang:

1. `index.html` - Trang giới thiệu
2. `login.html` - Đăng nhập
3. `register.html` - Đăng ký
4. `forgot-password.html` - Quên mật khẩu
5. `reset-password.html` - Đặt lại mật khẩu
6. `driver-trip-create.html` - Tạo chuyến
7. `driver-join-requests.html` - Yêu cầu tham gia
8. `driver-schedule.html` - Lịch chuyến
9. `driver-trip-detail.html` - Chi tiết chuyến

---

## 2.1. Cấu trúc thư mục

```
Hieu/
├── *.html                  — 9 trang, đặt phẳng ở thư mục gốc
├── assets/
│   └── favicon.svg         — favicon dùng chung toàn site
├── css/
│   ├── style.css           — CSS dùng chung (thành phần mới + giao diện tối)
│   └── <tên-trang>.css     — CSS riêng của từng trang
└── js/
    ├── main.js             — JS dùng chung (tìm kiếm, lọc, hộp thoại xác nhận, đổi giao diện)
    └── <tên-trang>.js      — JS riêng của từng trang
```

Mọi trang đều nạp `assets/favicon.svg`, `css/style.css` và `js/main.js`;
CSS/JS riêng của trang được nạp sau nên luôn ưu tiên hơn.

## 2.2. Tính năng dùng chung (`js/main.js` + `css/style.css`)

Các tính năng mới chỉ cần gắn thuộc tính `data-...` vào HTML, không phải viết JS riêng cho từng trang:

- **Tìm kiếm**: ô nhập `[data-tim-kiem]` lọc tức thời các mục có `[data-tim-duoc]`.
- **Lọc theo trạng thái**: dải `[data-nhom-loc]` chứa nút `[data-loc]`, lọc mục theo `[data-muc-loc]`, số đếm trên nút tự cập nhật.
- **Hộp thoại xác nhận chung**: nút `[data-xac-nhan]` mở hộp thoại; khi bấm "Đồng ý" sẽ thực hiện:
  - `data-hanh-dong="xoa"` — xóa phần tử khỏi trang (ví dụ xóa hành khách);
  - `data-hanh-dong="doi-trang-thai"` — thay cụm nút bằng nhãn trạng thái mới, có thể kèm ô nhập lý do bắt buộc (`data-xac-nhan-nhap`, `data-bat-buoc`, `data-hien-ly-do`);
  - `data-hanh-dong="doi-huy-hieu"` — đổi huy hiệu của chuyến (lưu trữ / hoàn thành / đã hủy).
- **Thêm & xóa mục danh sách**: `[data-them-muc]` (thêm ghi chú ở trang chi tiết chuyến) và `[data-xoa-muc]`.
- **Đổi giao diện sáng/tối**: nút `[data-doi-giao-dien]` trên header, lựa chọn được nhớ trong `localStorage` (khóa `cmTheme`, class `body.cm-dark`).
- **Thông báo rỗng**: khi tìm kiếm/lọc không còn kết quả, tự hiện khối `[data-bao-trong]`.

Đã áp dụng: `driver-join-requests.html` (tìm kiếm + lọc trạng thái, từ chối kèm lý do bắt buộc), `driver-schedule.html` (tìm kiếm + lọc, lưu trữ chuyến), `driver-trip-detail.html` (xóa hành khách, đánh dấu hoàn thành, hủy chuyến, thêm ghi chú). Nút đổi giao diện sáng/tối có ở header của cả 5 trang chính.

---

## 3. Mục đích của trang

Website được xây dựng nhằm hỗ trợ người dùng quản lý và tham gia các chuyến đi chung xe.

Hệ thống hướng đến các mục tiêu:

- Giúp người dùng dễ dàng tạo và tìm kiếm chuyến đi.
- Hỗ trợ quản lý thông tin chuyến đi.
- Hỗ trợ tài xế quản lý các yêu cầu tham gia.
- Cung cấp thông tin chi tiết về chuyến đi.
- Hỗ trợ đề xuất điểm gặp phù hợp bằng AI.
- Giúp việc kết nối giữa tài xế và hành khách thuận tiện hơn.

---

# 4. Các trang và chức năng chính

## 4.1. `index.html`

### Mục nội dung

- Giới thiệu về hệ thống.
- Giới thiệu lợi ích của việc đi chung xe.
- Hướng dẫn cách hệ thống hoạt động.
- Kêu gọi người dùng đăng ký hoặc đăng nhập.

### Hành động

- Bấm **Đăng ký**.
- Bấm **Đăng nhập**.

### Đi đến

- → `login.html`
- → `register.html`

---

## 4.2. `login.html`

### Mục nội dung

- Email.
- Mật khẩu.
- Lựa chọn vai trò người dùng.

### Hành động

- Kiểm tra dữ liệu nhập.
- Đăng nhập vào hệ thống.
- Hiển thị thông báo khi thông tin đăng nhập không hợp lệ.

### Đi đến

- → Trang chủ theo vai trò.
- → `forgot-password.html`
- → `register.html`

---

## 4.3. `register.html`

### Mục nội dung

- Họ tên.
- Email.
- Mật khẩu.
- Vai trò người dùng.

### Hành động

- Kiểm tra tính hợp lệ của thông tin.
- Đăng ký tài khoản.

### Đi đến

- → `login.html`

---

## 4.4. `forgot-password.html`

### Mục nội dung

- Ô nhập email.

### Hành động

- Gửi yêu cầu đặt lại mật khẩu.
- Hiển thị thông báo thành công hoặc lỗi.

### Đi đến

- → `reset-password.html`

---

## 4.5. `reset-password.html`

### Mục nội dung

- Mã/token đặt lại mật khẩu (mô phỏng).
- Mật khẩu mới.
- Xác nhận mật khẩu.

### Hành động

- Kiểm tra tính hợp lệ của dữ liệu.
- Đặt lại mật khẩu.
- Hiển thị thông báo đặt lại mật khẩu thành công.

### Đi đến

- → `login.html`

---

## 4.6. `driver-trip-create.html`

### Mục nội dung

- Form nhập thông tin tuyến đường.
- Ngày và giờ khởi hành.
- Số chỗ.
- Giá chuyến đi.
- Ghi chú.
- Panel AI-2 đề xuất điểm gặp.
- Hiển thị lý do cho từng điểm gặp được đề xuất.

### Hành động

- Kiểm tra tính hợp lệ của thông tin chuyến.
- Chấp nhận điểm gặp được đề xuất.
- Sửa điểm gặp.
- Từ chối điểm gặp.
- Tạo lại điểm gặp.
- Lưu chuyến dưới dạng bản nháp.
- Đăng chuyến.

### Đi đến

- → `driver-schedule.html`

---

## 4.7. `driver-join-requests.html`

### Mục nội dung

- Danh sách các yêu cầu tham gia chuyến.
- Thông tin hành khách.
- Điểm phù hợp.
- Điểm đón.
- Trạng thái yêu cầu:
  - Đang chờ.
  - Đã duyệt.
  - Từ chối.
- Trạng thái rỗng khi không có yêu cầu.

### Hành động

- Duyệt yêu cầu tham gia.
- Từ chối yêu cầu kèm lý do.
- Lọc yêu cầu theo chuyến.
- Lọc yêu cầu theo trạng thái.

### Đi đến

- → `driver-trip-detail.html`
- → `driver-schedule.html`

---

## 4.8. `driver-schedule.html`

### Mục nội dung

- Hiển thị lịch các chuyến đi.
- Hiển thị chuyến dưới dạng danh sách.
- Hiển thị chuyến dưới dạng lịch.
- Bộ lọc trạng thái chuyến.
- Trạng thái rỗng khi chưa có chuyến.

### Hành động

- Sửa chuyến.
- Hủy chuyến.
- Lưu trữ chuyến.
- Đánh dấu chuyến đã hoàn thành.

### Đi đến

- → `driver-trip-detail.html`
- → `driver-trip-create.html`

---

## 4.9. `driver-trip-detail.html`

### Mục nội dung

- Thông tin chi tiết chuyến đi.
- Danh sách người tham gia.
- Số chỗ còn lại.
- Các đánh giá nhận được.

### Hành động

- Sửa thông tin chuyến.
- Xóa người tham gia.
- Đánh dấu hoàn thành chuyến.
- Đánh giá hành khách bằng modal.
- Báo cáo.

### Đi đến

- → `driver-join-requests.html`
- → `driver-schedule.html`

---

# 5. Công nghệ sử dụng

- **HTML5** - Xây dựng cấu trúc các trang web.
- **CSS3** - Thiết kế giao diện và bố cục.
- **JavaScript** - Xử lý tương tác và logic của website.
- **Bootstrap** - Hỗ trợ thiết kế giao diện responsive.
- **LocalStorage** - Lưu trữ một số dữ liệu mô phỏng phía trình duyệt.
- **Git & GitHub** - Quản lý mã nguồn và triển khai project.

---

# 6. Link Figma

**Figma:**  
[Thêm link Figma của project tại đây](LINK_FIGMA)

---

# 7. Link Video

**Video demo:**  
[Thêm link video demo tại đây](LINK_VIDEO)

---

# 8. Link GitHub

**GitHub Repository:**  
[Thêm link GitHub của project tại đây](LINK_GITHUB)
