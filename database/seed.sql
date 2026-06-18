-- Seed inicial

USE mundoinfo;

INSERT INTO admin ( username, password_hash)
VALUES ('admin', '$2y$10$qUaSybPAa91u7ypkXquOEe50UEzM4Bbc2j.oRvVQtAQ.1n.XQfVUi');

INSERT INTO product (sku, name, brand, category, stock_quantity, price, original_price, featured, image_card, description, active)
VALUES

('Produto-001',
 'Monitor ASUS TUF 27" Full HD, 240Hz, 0.3ms, Fast IPS - VG279QM5A',
 'ASUS', 'Monitor', 12,
 1199.99, 2272.72, 1,
 'assets/img/produto-001/image-card.jpg',
 'Tecnologia e Precisão: Fast IPS com 1ms de tempo de resposta (0.3ms mínimo) e 240Hz para jogabilidade fluida Design e Ergonomia: 27" FHD com tecnologias Adaptive-Sync, AMD FreeSync Premium e G-SYNC para eliminar screen tearing Conectividade: Não especificada para compatibilidade e recursos com ou sem fio Recursos Especiais: HDR10, ELMB, Shadow Boost e GameVisual para visuais otimizados e customizados',
 1),

('Produto-002',
 'Placa de Vídeo XFX Swift RX 9070 XT',
 'XFX', 'Placa de Vídeo', 15,
 4599.99, 6211.65, 1,
 'assets/img/produto-002/image-card.jpg',
 'Placa de Vídeo XFX Swift RX 9070 XT WHITE TRIPLE FAN GAMING EDITION WITH AMD Radeon, 16GB, GDDR6, HDMI 3xDP, RDNA 4 - RX-97T5WF3W9',
 1),

('Produto-003',
 'Notebook Acer Nitro 5 Intel Core i7, RTX 4060, 16GB RAM, 512GB SSD',
 'Acer', 'Periféricos', 13,
 3499.00, 4299.00, 0,
 'assets/img/produto-003/image-card.jpg',
 'Notebook Gamer Acer Nitro 5, Intel Core i7, RTX 4060, 16GB RAM, 512GB SSD, Tela 144Hz, Windows 11',
 1),

('Produto-004',
 'Headset HyperX Cloud III Microfone Removível',
 'HyperX', 'Periféricos', 18,
 349.99, 499.99, 0,
 'assets/img/produto-004/image-card.jpg',
 'Headset Gamer HyperX Cloud III, Áudio DTS Headphone:X, Microfone Removível, Compatível com PC, PS5, Xbox, Mobile',
 1),

('Produto-005',
 'Monitor Samsung 27" Curvo Full HD, 165Hz',
 'Samsung', 'Monitor', 19,
 899.00, 1299.00, 0,
 'assets/img/produto-005/image-card.jpg',
 'Monitor Samsung 27" Curvo, Full HD, 165Hz, 1ms, painel VA, entradas HDMI e DisplayPort, FreeSync Premium',
 1),

('Produto-006',
 'Teclado Mecânico HyperX Alloy',
 'HyperX', 'Periféricos', 21,
 279.99, 399.99, 0,
 'assets/img/produto-006/image-card.jpg',
 'Teclado Mecânico HyperX Alloy Origins, Switches HyperX Red Linear, RGB por tecla, Layout ABNT2, Compacto TKL',
 1),

('Produto-007',
 'SSD Samsung 990 Pro 1TB',
 'Samsung', 'SSD', 31,
 449.99, 599.99, 0,
 'assets/img/produto-007/image-card.jpg',
 'SSD Samsung 990 Pro 1TB NVMe PCIe 4.0 M.2, Leitura Seq. 7.450MB/s, Gravação Seq. 6.900MB/s, MZ-V9P1T0BW',
 1),

('Produto-008',
 'Gabinete ASUS ROG Strix Helios',
 'ASUS', 'Gabinete', 0,
 799.99, 1099.99, 0,
 'assets/img/produto-008/image-card.jpg',
 'Gabinete Gamer ASUS ROG Strix Helios, Mid Tower, Vidro Temperado, Aura Sync RGB, Suporte GPU Vertical, GX601',
 1),

('Produto-009',
 'Memória RAM XFX 32GB DDR5',
 'XFX', 'Memória Ram', 16,
 389.99, 499.99, 0,
 'assets/img/produto-009/image-card.jpg',
 'Memória RAM XFX 32GB (2x16GB) DDR5, 6000MHz, CL30, RGB Endereçável, XMP 3.0, compatível com Intel e AMD',
 1),

('Produto-010',
 'Fonte ASUS ROG Thor 850W',
 'ASUS', 'Periféricos', 13,
 699.99, 899.99, 0,
 'assets/img/produto-010/image-card.jpg',
 'Fonte ASUS ROG Thor 850W Platinum Modulada, Display OLED Power, Aura Sync RGB, certificação 80 Plus Platinum',
 1),

 ('Produto-011',
 'Placa de Vídeo PALIT GeForce RTX 5070 8GB INFINITY 2 OC GDDR7',
 'PALIT', 'Placa de Vídeo', 55,
 2279.99, 2279.99, 0,
 'assets/img/produto-011/image-card.jpg',
 'A Placa de Vídeo PALIT GeForce RTX 5070 8GB INFINITY 2 OC GDDR7, baseada na Arquitetura NVIDIA Blackwell, redefine os padrões de imersão e produtividade. Projetada para a próxima geração de jogos e aplicações criativas, esta GPU oferece Ray Tracing e IA, garantindo gráficos ultra-realistas e um desempenho sem precedentes. Com a tecnologia NVIDIA DLSS 4 e Multi Frame Generation, você obtém um aprimoramento de desempenho e gráficos impulsionado por Inteligência Artificial, enquanto a tecnologia NVIDIA Reflex proporciona um tempo de resposta revolucionário, crucial para jogos competitivos. Para criadores, as ferramentas e tecnologias NVIDIA Studio aceleram seu fluxo de trabalho, e o NVIDIA Broadcast, juntamente com o NVIDIA Encoder de 9ª Geração, eleva a qualidade de transmissões e edições de vídeo.',
 1),

('Produto-012',
 'Placa de Vídeo MSI GeForce RTX 5070 12G VENTUS 2X OC',
 'MSI', 'Placa de Vídeo', 18,
 6000.99, 6000.99, 0,
 'assets/img/produto-012/image-card.jpg',
 'Placa de Vídeo MSI GeForce RTX 5070 12G VENTUS 2X OC. Você pode embalar alto desempenho em um espaço menor com esta placa SFF-Ready Enthusiast GeForce. Procure gabinetes que sejam compatíveis com as placas SFF-Ready Enthusiast GeForce para obter um ajuste seguro e otimizar a montagem do seu PC. Domine a velocidade Warp com NVIDIA Reflex As tecnologias NVIDIA Reflex otimizam o pipeline gráfico para proporcionar o máximo em capacidade de resposta em jogos competitivos, oferecendo aquisição de alvo mais rápida, tempos de reação aprimorados e precisão de mira aperfeiçoada. Com o Reflex 2 e seu inovador Frame Warp, a latência é ainda mais reduzida, levando em consideração os dados de entrada do mouse mais recentes do jogo. Domine a velocidade Warp e alcance o topo do ranking!',
 1),

('Produto-013',
 'SSD Kingston KC3000 2TB NVMe PCIe 4.0',
 'Kingston', 'SSD', 30,
 699.99, 899.99, 0,
 'assets/img/produto-013/image-card.jpg',
 'SSD Kingston KC3000 2TB NVMe PCIe 4.0 M.2, velocidades de leitura de até 7000MB/s e gravação de até 7000MB/s, ideal para gamers e criadores de conteúdo.',
 1),

('Produto-014',
 'Monitor LG UltraWide 34" QHD 160Hz',
 'LG', 'Monitor', 9,
 1999.99, 2499.99, 1,
 'assets/img/produto-014/image-card.jpg',
 'Monitor LG UltraWide 34 polegadas, resolução QHD 3440x1440, taxa de atualização de 160Hz, HDR10 e AMD FreeSync Premium.',
 1),

('Produto-015',
 'Placa de Vídeo Gigabyte GeForce RTX 5070 Gaming OC 12GB',
 'Gigabyte', 'Placa de Vídeo', 6,
 3899.99, 4499.99, 1,
 'assets/img/produto-015/image-card.jpg',
 'Placa de vídeo Gigabyte GeForce RTX 5070 Gaming OC com 12GB GDDR7, Ray Tracing avançado, DLSS 4 e sistema de refrigeração WINDFORCE.',
 1),

('Produto-016',
 'Fonte Corsair RM750e 750W 80 Plus Gold',
 'Corsair', 'Periféricos', 14,
 649.99, 799.99, 0,
 'assets/img/produto-016/image-card.jpg',
 'Fonte Corsair RM750e totalmente modular, certificação 80 Plus Gold, ventoinha de baixo ruído e compatibilidade ATX 3.1.',
 1),

('Produto-017',
 'Gabinete NZXT H6 Flow RGB',
 'NZXT', 'Gabinete', 11,
 699.99, 849.99, 0,
 'assets/img/produto-017/image-card.jpg',
 'Gabinete NZXT H6 Flow RGB Mid Tower com painel panorâmico em vidro temperado, excelente fluxo de ar e ventoinhas RGB inclusas.',
 1),

('Produto-018',
 'Memória RAM Corsair Vengeance RGB DDR5 32GB 6000MHz',
 'Corsair', 'Memória Ram', 20,
 549.99, 699.99, 0,
 'assets/img/produto-018/image-card.jpg',
 'Kit Corsair Vengeance RGB DDR5 32GB (2x16GB), frequência de 6000MHz, suporte Intel XMP e iluminação RGB personalizável.',
 1),

('Produto-019',
 'Notebook Lenovo Legion 5 Intel Core i7 RTX 4070',
 'Lenovo', 'Periféricos', 5,
 6999.99, 7999.99, 1,
 'assets/img/produto-019/image-card.jpg',
 'Notebook Gamer Lenovo Legion 5 com Intel Core i7, GeForce RTX 4070, 16GB DDR5, SSD NVMe 1TB e tela IPS 165Hz.',
 1),

('Produto-020',
 'Monitor Dell G2724D 27" QHD 165Hz',
 'Dell', 'Monitor', 12,
 1699.99, 1999.99, 0,
 'assets/img/produto-020/image-card.jpg',
 'Monitor Gamer Dell G2724D de 27 polegadas, resolução QHD, painel IPS, taxa de atualização de 165Hz e compatibilidade AMD FreeSync Premium.',
 1);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-001'), 'assets/img/produto-001/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-001'), 'assets/img/produto-001/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-001'), 'assets/img/produto-001/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-001'), 'assets/img/produto-001/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-002'), 'assets/img/produto-002/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-002'), 'assets/img/produto-002/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-002'), 'assets/img/produto-002/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-002'), 'assets/img/produto-002/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-003'), 'assets/img/produto-003/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-003'), 'assets/img/produto-003/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-003'), 'assets/img/produto-003/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-003'), 'assets/img/produto-003/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-004'), 'assets/img/produto-004/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-004'), 'assets/img/produto-004/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-004'), 'assets/img/produto-004/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-004'), 'assets/img/produto-004/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-005'), 'assets/img/produto-005/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-005'), 'assets/img/produto-005/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-005'), 'assets/img/produto-005/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-005'), 'assets/img/produto-005/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-006'), 'assets/img/produto-006/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-006'), 'assets/img/produto-006/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-006'), 'assets/img/produto-006/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-006'), 'assets/img/produto-006/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-007'), 'assets/img/produto-007/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-007'), 'assets/img/produto-007/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-007'), 'assets/img/produto-007/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-007'), 'assets/img/produto-007/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-008'), 'assets/img/produto-008/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-008'), 'assets/img/produto-008/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-008'), 'assets/img/produto-008/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-008'), 'assets/img/produto-008/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-009'), 'assets/img/produto-009/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-009'), 'assets/img/produto-009/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-009'), 'assets/img/produto-009/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-009'), 'assets/img/produto-009/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-010'), 'assets/img/produto-010/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-010'), 'assets/img/produto-010/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-010'), 'assets/img/produto-010/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-010'), 'assets/img/produto-010/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-011'), 'assets/img/produto-011/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-011'), 'assets/img/produto-011/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-011'), 'assets/img/produto-011/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-011'), 'assets/img/produto-011/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-012'), 'assets/img/produto-012/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-012'), 'assets/img/produto-012/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-012'), 'assets/img/produto-012/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-012'), 'assets/img/produto-012/image-4.jpg', 4);


INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-013'), 'assets/img/produto-013/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-013'), 'assets/img/produto-013/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-013'), 'assets/img/produto-013/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-013'), 'assets/img/produto-013/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-014'), 'assets/img/produto-014/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-014'), 'assets/img/produto-014/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-014'), 'assets/img/produto-014/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-014'), 'assets/img/produto-014/image-4.jpg', 4);


INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-015'), 'assets/img/produto-015/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-015'), 'assets/img/produto-015/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-015'), 'assets/img/produto-015/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-015'), 'assets/img/produto-015/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-016'), 'assets/img/produto-016/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-016'), 'assets/img/produto-016/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-016'), 'assets/img/produto-016/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-016'), 'assets/img/produto-016/image-4.jpg', 4);


INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-017'), 'assets/img/produto-017/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-017'), 'assets/img/produto-017/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-017'), 'assets/img/produto-017/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-017'), 'assets/img/produto-017/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-018'), 'assets/img/produto-018/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-018'), 'assets/img/produto-018/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-018'), 'assets/img/produto-018/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-018'), 'assets/img/produto-018/image-4.jpg', 4);


INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-019'), 'assets/img/produto-019/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-019'), 'assets/img/produto-019/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-019'), 'assets/img/produto-019/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-019'), 'assets/img/produto-019/image-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-020'), 'assets/img/produto-020/image-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-020'), 'assets/img/produto-020/image-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-020'), 'assets/img/produto-020/image-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-020'), 'assets/img/produto-020/image-4.jpg', 4);
