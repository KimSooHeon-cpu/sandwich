-- 개별 회원 정보 조회하기
SELECT * FROM members WHERE phone = '01012345678';

-- 상품 목록 더미 데이터 삽입
INSERT INTO products (name, price, image) VALUES
  ('B.L.T', 'Subway', 5900, 'B.L.T_20211231094744175.png'),
  ('Egg-Mayo', 'Subway', 8000, 'Egg-Mayo_20211231094817112.png');