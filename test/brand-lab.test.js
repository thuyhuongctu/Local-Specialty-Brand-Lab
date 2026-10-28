// Xưởng Nhãn Hiệu Đặc Sản (28/10/2026): phiếu bài chuyên cần chương 5 – nhãn hiệu + 4P, xuất Thẻ thương hiệu.
// Phần thuần (gợi ý, tiến độ, mã thẻ) test bằng Node; trang test bằng trình duyệt (điện thoại, song ngữ, xuất PNG).
'use strict';
const path = require('node:path');
const assert = require('node:assert/strict');
const ROOT = path.join(__dirname, '..');
require(path.join(ROOT, 'js/xuong-nhan-hieu.js'));
const L = globalThis.BizOnBrandLab;

// Gợi ý bám đúng đề
let h = L.hints({ ten: 'Xanh Sạch', slogan: 'Hướng tới tương lai xanh' });
assert.ok(h.ten.some(m => m.level === 'warn'), 'tên ví dụ trong đề phải bị nhắc');
assert.ok(h.slogan.some(m => m.level === 'warn'), 'slogan ví dụ trong đề phải bị nhắc');
h = L.hints({ ten: 'Sạch' }); assert.ok(h.ten[0].level === 'warn', 'tên chung chung phải bị nhắc');
h = L.hints({ ten: 'Mắm Bà Tư' }); assert.equal(h.ten[0].level, 'ok');
h = L.hints({ slogan: 'một hai ba bốn năm sáu bảy tám chín mười mười một' }); assert.ok(h.slogan.some(m => /dài/.test(m.vi)));
h = L.hints({ product: 'Sản phẩm chất lượng cao, đáp ứng nhu cầu khách hàng.' }); assert.ok(h.product.some(m => /chung chung/.test(m.vi)));
h = L.hints({ place: ['shopee', 'tiktok'] }); assert.ok(h.place.some(m => /trực tuyến và trực tiếp/.test(m.vi)), 'thiếu kênh trực tiếp phải bị nhắc');
h = L.hints({ place: ['shopee', 'hoicho'] }); assert.ok(!h.place, 'đủ hai loại kênh thì không nhắc');
h = L.hints({ priceStrategy: 'tham-nhap', giaBan: 'rẻ' }); assert.ok(h.price.some(m => /giá bán dự kiến/.test(m.vi)));
h = L.hints({ giaiThich: 'Tên đẹp.' }); assert.ok(h.giaiThich.length >= 3, 'giải thích ngắn, thiếu ý vốn nhỏ/khách trong nước/nét riêng');

// Tiến độ và mã thẻ
const full = { nhom: 'nong-san', sanPham: 'Mắm cá linh', vung: 'An Giang', ten: 'Linh Mùa Nước', slogan: 'Vị mùa nước nổi',
  giaiThich: 'Tên ngắn gợi mùa nước nổi An Giang, dễ nhớ với khách trong nước, in nhãn rẻ nên hợp doanh nghiệp mới vốn nhỏ mới thành lập.',
  product: 'Cá linh non đánh bắt mùa nước nổi, ủ muối và thính gạo 30 ngày, hũ thủy tinh 500 g, hạn dùng 6 tháng.',
  priceStrategy: 'gia-tri', giaBan: '120.000 đ/hũ 500 g', priceReason: 'Cao hơn mắm chợ khoảng 20% vì hũ quà tặng, vẫn thấp hơn hàng OCOP 4 sao.',
  place: ['shopee', 'hoicho'], promo: ['cauchuyen', 'video'], promoNote: 'Tháng đầu: 8 video ngắn quay mùa nước nổi trên TikTok, mời 3 KOC địa phương, chi 3 triệu đồng.' };
assert.deepEqual(L.progress(full), { done: 8, total: 8 });
assert.equal(L.progress({}).done, 0);
assert.match(L.code(full), /^XNH-[0-9A-F]{4}-[0-9A-F]{4}$/);
assert.equal(L.code(full), L.code(Object.assign({}, full, { hoTen: 'A', mssv: '1' })), 'mã thẻ không phụ thuộc họ tên');
assert.notEqual(L.code(full), L.code(Object.assign({}, full, { slogan: 'Khác' })));
assert.equal(L.fileName(full), 'the-thuong-hieu-linh-mua-nuoc.png');

console.log('brand-lab: ok');
