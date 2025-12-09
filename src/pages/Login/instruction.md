Hãy tạo cho tôi một React Login Form với các yêu cầu:

1. Công nghệ:

   - React + TypeScript
   - React Hook Form
   - Zod để validate
   - UI dùng HTML + CSS (hoặc Tailwind nếu tôi yêu cầu thêm)

2. Tính năng:

   - Input: email, password
   - Validate realtime
   - Email: phải đúng định dạng
   - Password: tối thiểu 6 ký tự
   - Hiển thị lỗi dưới từng input
   - Nút Login disabled khi form không hợp lệ
   - Khi submit: console.log dữ liệu form

3. Kiến trúc:

   - Code clean, dễ hiểu
   - Component dạng arrow function
   - Tách UI và logic rõ ràng
   - Sử dụng zodResolver
   - Không có logic phức tạp trong JSX

4. Test:
   Tạo file `LoginForm.test.tsx` với:

   - Vitest + @testing-library/react
   - Test render component
   - Test validate email và password
   - Test disabled/enable button
   - Test submit gọi console.log với dữ liệu đúng
   - Test hiển thị error message khi input sai

5. Format:
   - TypeScript strict
   - Code ngắn gọn, tránh trùng lặp
