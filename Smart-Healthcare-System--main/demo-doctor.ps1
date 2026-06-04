# ============================================================
#  HƯỚNG DẪN DEMO - PHẦN BÁC SĨ (Doctor Module)
#  Smart Healthcare System - Demo Presentation Script
# ============================================================
#
#  CÁCH DÙNG:
#  1. Chạy script này bằng PowerShell: .\demo-doctor.ps1
#  2. Script sẽ tự khởi động dev server và mở trình duyệt
#  3. Làm theo từng bước bên dưới để giới thiệu
#
#  HOẶC: Chạy thủ công
#  - Terminal 1: cd "Smart Healthcare System Upgrade" → npm run dev
#  - Mở trình duyệt: http://localhost:5173
#  - Đăng nhập → Chọn vai trò Bác sĩ
#
# ============================================================

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  SMART HEALTHCARE SYSTEM - DEMO BÁC SĨ" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# --- BƯỚC 1: Khởi động dev server ---
Write-Host "[1/6] Đang khởi động dev server..." -ForegroundColor Yellow

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverPath = Join-Path $projectPath "Smart Healthcare System Upgrade"

if (Test-Path $serverPath) {
    Write-Host "    > Tìm thấy project tại: $serverPath" -ForegroundColor Green
} else {
    Write-Host "    > Project không tìm thấy. Đang tìm..." -ForegroundColor Red
    $found = Get-ChildItem -Path $projectPath -Recurse -Directory -Depth 2 | Where-Object { $_.Name -like "*Smart*" } | Select-Object -First 1
    if ($found) {
        $serverPath = $found.FullName
        Write-Host "    > Tìm thấy: $serverPath" -ForegroundColor Green
    } else {
        Write-Host "    > LỖI: Không tìm thấy thư mục Smart Healthcare System Upgrade" -ForegroundColor Red
        Read-Host "Nhấn Enter để thoát"
        exit 1
    }
}

# Kill các server cũ
$nodeProcs = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -like "*vite*" -or $_.Path -like "*node_modules*" }
if ($nodeProcs) {
    Write-Host "    > Đang dừng server cũ..." -ForegroundColor Yellow
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

# Clear Vite cache
$cachePath = Join-Path $serverPath "node_modules\.vite"
if (Test-Path $cachePath) {
    Remove-Item -Path $cachePath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "    > Đã xóa Vite cache" -ForegroundColor Gray
}

# Start dev server
Write-Host ""
Write-Host "    > Đang start dev server (chờ ~5 giây)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 6

Write-Host ""
Write-Host "    > Server đã khởi động!" -ForegroundColor Green
Write-Host "    > Mở trình duyệt: http://localhost:5173" -ForegroundColor Green

# --- BƯỚC 2: Mở trình duyệt ---
Write-Host ""
Write-Host "[2/6] Mở trình duyệt..." -ForegroundColor Yellow
Start-Sleep -Seconds 1
Start-Process "http://localhost:5173"

# --- BƯỚC 3: Đăng nhập ---
Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  BẮT ĐẦU DEMO" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Hãy làm theo từng bước bên dưới:" -ForegroundColor White
Write-Host ""

# Demo script content
$demos = @"

╔══════════════════════════════════════════════════════════════════════╗
║                    SCRIPT DEMO - PHẦN BÁC SĨ                        ║
╚══════════════════════════════════════════════════════════════════════╝

TRANG 1: TRANG CHỦ BÁC SĨ (http://localhost:5173/doctor/home)
────────────────────────────────────────────────────────────────────
GIỚI THIỆU:
  ✅ Dashboard tổng quan với 4 thống kê: Bệnh nhân hôm nay, Đang chờ,
     Đã hoàn thành, Tin nhắn mới
  ✅ Danh sách ca khám hôm nay với bộ lọc theo trạng thái
  ✅ Màu sắc ưu tiên: Đỏ (khẩn cấp), Cam (cao), Xanh (bình thường)
  ✅ Sidebar AI gợi ý chẩn đoán dựa trên triệu chứng bệnh nhân
  ✅ Thao tác nhanh: Khám bệnh, Lịch khám, Bệnh án
  ✅ Gọi video trực tiếp với bệnh nhân
  ✅ Tin nhắn mới từ bệnh nhân

THAO TÁC DEMO:
  1. Click chọn một bệnh nhân → Xem AI gợi ý chẩn đoán bên phải
  2. Click nút Video → Xem giao diện gọi video
  3. Click bộ lọc "Đang chờ" → Lọc danh sách theo trạng thái
  4. Click nút 'Bắt đầu khám' → Chuyển sang trang khám

NHẤN ENTER ĐỂ TIẾP TỤC...
"@

Write-Host $demos
Read-Host ""

# Clear screen
Clear-Host

$demos2 = @"

╔══════════════════════════════════════════════════════════════════════╗
║                    SCRIPT DEMO - PHẦN BÁC SĨ                        ║
╚══════════════════════════════════════════════════════════════════════╝

TRANG 2: TRANG KHÁM BỆNH (http://localhost:5173/doctor/exam)
────────────────────────────────────────────────────────────────────
GIỚI THIỆU:
  ✅ Giao diện khám bệnh chuyên nghiệp với 3 tabs:
     • Tư vấn: Chẩn đoán, kê đơn thuốc, yêu cầu xét nghiệm
     • Tin nhắn: Chat trực tiếp với bệnh nhân
     • Sinh hiệu: Theo dõi huyết áp, nhịp tim, SpO2, cân nặng
  ✅ Thông tin bệnh nhân đầy đủ: Tiền sử, dị ứng, triệu chứng
  ✅ AI gợi ý chẩn đoán tự động dựa trên triệu chứng
  ✅ Modal kê đơn thuốc với đầy đủ thông tin thuốc
  ✅ Modal yêu cầu xét nghiệm với 20 loại xét nghiệm phổ biến
  ✅ Cảnh báo dị ứng thuốc cho bệnh nhân

THAO TÁC DEMO:
  1. Click chọn bệnh nhân 'Nguyễn Văn A' (có dị ứng Penicillin)
  2. Nhìn cảnh báo dị ứng màu đỏ ở phần thông tin
  3. Click tab 'Sinh hiệu' → Xem các chỉ số vital
  4. Click 'Thêm thuốc' → Điền thông tin kê đơn
  5. Click 'Thêm xét nghiệm' → Chọn xét nghiệm cần thiết
  6. Click 'Lưu & Hoàn thành' → Lưu phiên khám

NHẤN ENTER ĐỂ TIẾP TỤC...
"@

Write-Host $demos2
Read-Host ""

Clear-Host

$demos3 = @"

╔══════════════════════════════════════════════════════════════════════╗
║                    SCRIPT DEMO - PHẦN BÁC SĨ                        ║
╚══════════════════════════════════════════════════════════════════════╝

TRANG 3: QUẢN LÝ LỊCH KHÁM (http://localhost:5173/doctor/schedule)
────────────────────────────────────────────────────────────────────
GIỚI THIỆU:
  ✅ Lịch tuần với 7 ngày, hiển thị số lịch hẹn mỗi ngày
  ✅ Danh sách lịch hẹn với bộ lọc: Đã xác nhận, Chờ xác nhận, Đã hủy
  ✅ Lịch hôm nay chi tiết theo từng khung giờ
  ✅ Bộ lọc nhanh: Online/Offline, Khẩn cấp, Cao ưu tiên
  ✅ Xác nhận/Hủy lịch hẹn với 1 click
  ✅ Giờ làm việc của bác sĩ

THAO TÁC DEMO:
  1. Click 'Đặt lịch mới' → Tạo lịch hẹn mới
  2. Click nút Xác nhận (✓) ở lịch 'Chờ xác nhận'
  3. Click nút Hủy (✗) để hủy lịch
  4. Click bộ lọc 'Lịch khám online' bên phải
  5. Click nút 'Hôm nay' để quay về ngày hiện tại

NHẤN ENTER ĐỂ TIẾP TỤC...
"@

Write-Host $demos3
Read-Host ""

Clear-Host

$demos4 = @"

╔══════════════════════════════════════════════════════════════════════╗
║                    SCRIPT DEMO - PHẦN BÁC SĨ                        ║
╚══════════════════════════════════════════════════════════════════════╝

TRANG 4: HỒ SƠ BÁC SĨ (http://localhost:5173/doctor/profile)
────────────────────────────────────────────────────────────────────
GIỚI THIỆU:
  ✅ Thông tin cá nhân bác sĩ: Họ tên, chức danh, chuyên khoa
  ✅ Đánh giá & xếp hạng: 4.9/5 sao, 324 đánh giá
  ✅ 3 tabs: Thông tin, Kinh nghiệm, Chứng chỉ
  ✅ Lịch làm việc của bác sĩ trong tuần
  ✅ Nút chỉnh sửa hồ sơ
  ✅ Trạng thái "Đã xác minh" (ShieldCheck)

THAO TÁC DEMO:
  1. Click tab 'Kinh nghiệm' → Xem lịch sử công tác
  2. Click tab 'Chứng chỉ' → Xem các chứng chỉ hành nghề
  3. Click nút 'Chỉnh sửa' → Sửa thông tin cá nhân
  4. Sửa bio và thông tin → Click 'Lưu thay đổi'

NHẤN ENTER ĐỂ TIẾP TỤC...
"@

Write-Host $demos4
Read-Host ""

Clear-Host

$demos5 = @"

╔══════════════════════════════════════════════════════════════════════╗
║                    SCRIPT DEMO - PHẦN BÁC SĨ                        ║
╚══════════════════════════════════════════════════════════════════════╝

TRANG 5: QUẢN LÝ BỆNH ÁN (http://localhost:5173/doctor/records)
────────────────────────────────────────────────────────────────────
GIỚI THIỆU:
  ✅ Danh sách hồ sơ bệnh án với tìm kiếm & lọc
  ✅ Thông tin đầy đủ: Chẩn đoán, đơn thuốc, xét nghiệm, ghi chú
  ✅ Trạng thái: Đang điều trị / Đã lưu trữ
  ✅ Expand để xem chi tiết từng bệnh án
  ✅ Nút tái khám và xuất PDF

THAO TÁC DEMO:
  1. Tìm kiếm 'Nguyễn Văn A' trong ô tìm kiếm
  2. Click vào dòng bệnh nhân → Mở rộng xem chi tiết
  3. Click 'Xuất PDF' → Tải bệnh án
  4. Click 'Tái khám' → Tạo lịch tái khám

NHẤN ENTER ĐỂ TIẾP TỤC...
"@

Write-Host $demos5
Read-Host ""

Clear-Host

$demos6 = @"

╔══════════════════════════════════════════════════════════════════════╗
║                    SCRIPT DEMO - PHẦN BÁC SĨ                        ║
╚══════════════════════════════════════════════════════════════════════╝

TRANG 6: THỐNG KÊ CÁ NHÂN (http://localhost:5173/doctor/stats)
────────────────────────────────────────────────────────────────────
GIỚI THIỆU:
  ✅ Biểu đồ doanh thu theo 6 tháng gần nhất
  ✅ Thống kê: Tổng bệnh nhân, Doanh thu, Lịch hẹn, Tỷ lệ hài lòng
  ✅ Xu hướng tăng/giảm với chỉ số % thay đổi
  ✅ Phân loại bệnh nhân: Tái khám, Khám mới, Online, Định kỳ
  ✅ Bảng top 5 bệnh nhân thường xuyên nhất

THAO TÁC DEMO:
  1. Click '7 ngày' / 'Tháng' / 'Năm' → Thay đổi khoảng thời gian
  2. Hover vào cột biểu đồ → Xem doanh thu chi tiết
  3. Click 'Xuất báo cáo' → Tải PDF thống kê

KẾT THÚC DEMO
────────────────────────────────────────────────────────────────────
Cảm ơn bạn đã theo dõi demo!
Hệ thống Smart Healthcare System - Phần Bác sĩ
Các tính năng: Dashboard, Khám bệnh, Lịch khám, Hồ sơ, Bệnh án, Thống kê
"@

Write-Host $demos6 -ForegroundColor Green

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  KẾT THÚC DEMO" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# Open all doctor pages in tabs for reference
Write-Host "Mở tất cả trang doctor để tham khảo..." -ForegroundColor Yellow
Start-Process "http://localhost:5173/doctor/home"
Start-Sleep -Seconds 1
Start-Process "http://localhost:5173/doctor/exam"
Start-Process "http://localhost:5173/doctor/schedule"
Start-Process "http://localhost:5173/doctor/profile"
Start-Process "http://localhost:5173/doctor/records"
Start-Process "http://localhost:5173/doctor/stats"

Write-Host ""
Write-Host "Tất cả trang đã mở trong trình duyệt!" -ForegroundColor Green
Write-Host "Dev server vẫn chạy. Đóng terminal khi kết thúc." -ForegroundColor Gray
Write-Host ""
