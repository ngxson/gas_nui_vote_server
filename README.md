# NUI Vote Server

Code server để nhận webhook từ facebook, lưu lượt like và comments vào database riêng theo thời gian thực.

# Tại sao phải dùng cái này?

Vì với lượt like/cmts khá lớn (ví dụ trên 500), thì FB sẽ KHÔNG hiện hết được, cho dù có dùng cả graph API. Phương pháp này được tạo ra để lưu luôn lượt like và cmt theo thời gian thực. Vì vậy kể cả nick có deactivate thì cũng còn comment của họ trên database.

# Cách cài đặt

1. Tạo mới 1 Google Form cho việc lưu cmt, gồm 4 ô điền theo thứ tự:
- time: câu trả lời ngắn
- id: câu trả lời ngắn
- cmt: câu trả lời ngắn
- team: câu trả lời ngắn
2. Tạo mới 1 Google Form nữa để lưu lượt like, gồm 4 ô điền theo thứ tự:
- time: câu trả lời ngắn
- id: câu trả lời ngắn
- type: câu trả lời ngắn
- team: câu trả lời ngắn
3. Tạo project mới tại Google App Script
4. Copy paste code từ github vào Code.gs
5. Thay biến CMT_FORM và LIKE_FORM bằng id của 2 form vừa tạo phía trên
6. Đổi your_verify_token thành 1 password do bạn tự nghĩ ra
7. Trong phần teams, mỗi team ghi dưới dạng:
- "(id của page)_(id của post)":"số hoặc tên đội"
- ví dụ: "1808871722730718_2029963597288195":"1"
8. Vào publish > Deploy as web app
- Project version: new
- Execute the app as: Me
- Who has access to the app: Anyone, even anonymous
- Bấm Update
- Lưu lại địa chỉ web app (https://script.google.com/...). Đây chính là địa chỉ cho webhook
9. Vào facebook for developers và tạo 1 app mới
- Thiếp lập webhooks, chọn phần page
- Tạo webhook với địa chỉ và your_verify_token phía trên
- Subscrible mục "feed"
11. Vào facebook graph api explorer
- Chuyển app ở góc phải thành app bạn vừa tạo
- Bấm get token, chọn page bạn mở muốn bình chọn
- Chỗ nhập địa chỉ: chuyển GET thành POST và nhập vào: /id-của-page/subscribed_apps
- Bấm Send, nó hiện ra success:true là được
12. Thử cmt và like post bạn đã chọn. Nếu nó hiện ở 2 form đã tạo thì thành công.

# Credit

Made by NUI
https://facebook.com/ngxson
