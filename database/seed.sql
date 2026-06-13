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
 'assets/img/monitor/monitor-card.webp',
 'Tecnologia e Precisão: Fast IPS com 1ms de tempo de resposta (0.3ms mínimo) e 240Hz para jogabilidade fluida Design e Ergonomia: 27" FHD com tecnologias Adaptive-Sync, AMD FreeSync Premium e G-SYNC para eliminar screen tearing Conectividade: Não especificada para compatibilidade e recursos com ou sem fio Recursos Especiais: HDR10, ELMB, Shadow Boost e GameVisual para visuais otimizados e customizados',
 1),

('Produto-002',
 'Placa de Vídeo XFX Swift RX 9070 XT',
 'XFX', 'Placa de Vídeo', 15,
 4599.99, 6211.65, 1,
 'assets/img/gpu/gpu-card.webp',
 'Placa de Vídeo XFX Swift RX 9070 XT WHITE TRIPLE FAN GAMING EDITION WITH AMD Radeon, 16GB, GDDR6, HDMI 3xDP, RDNA 4 - RX-97T5WF3W9',
 1),

('Produto-003',
 'Notebook Acer Nitro 5 Intel Core i7, RTX 4060, 16GB RAM, 512GB SSD',
 'Acer', 'Periféricos', 13,
 3499.00, 4299.00, 0,
 'assets/img/notebook/notebook-card.webp',
 'Notebook Gamer Acer Nitro 5, Intel Core i7, RTX 4060, 16GB RAM, 512GB SSD, Tela 144Hz, Windows 11',
 1),

('Produto-004',
 'Headset HyperX Cloud III Microfone Removível',
 'HyperX', 'Periféricos', 18,
 349.99, 499.99, 0,
 'assets/img/headset/headset-card.webp',
 'Headset Gamer HyperX Cloud III, Áudio DTS Headphone:X, Microfone Removível, Compatível com PC, PS5, Xbox, Mobile',
 1),

('Produto-005',
 'Monitor Samsung 27" Curvo Full HD, 165Hz',
 'Samsung', 'Monitor', 19,
 899.00, 1299.00, 0,
 'assets/img/monitorsamsung/monitorsamsung-card.avif',
 'Monitor Samsung 27" Curvo, Full HD, 165Hz, 1ms, painel VA, entradas HDMI e DisplayPort, FreeSync Premium',
 1),

('Produto-006',
 'Teclado Mecânico HyperX Alloy',
 'HyperX', 'Periféricos', 21,
 279.99, 399.99, 0,
 'assets/img/teclado/teclado-card.jpg',
 'Teclado Mecânico HyperX Alloy Origins, Switches HyperX Red Linear, RGB por tecla, Layout ABNT2, Compacto TKL',
 1),

('Produto-007',
 'SSD Samsung 990 Pro 1TB',
 'Samsung', 'SSD', 31,
 449.99, 599.99, 0,
 'assets/img/ssd/ssd-card.jpg',
 'SSD Samsung 990 Pro 1TB NVMe PCIe 4.0 M.2, Leitura Seq. 7.450MB/s, Gravação Seq. 6.900MB/s, MZ-V9P1T0BW',
 1),

('Produto-008',
 'Gabinete ASUS ROG Strix Helios',
 'ASUS', 'Gabinete', 0,
 799.99, 1099.99, 0,
 'assets/img/gabinete/gabinete-card.webp',
 'Gabinete Gamer ASUS ROG Strix Helios, Mid Tower, Vidro Temperado, Aura Sync RGB, Suporte GPU Vertical, GX601',
 1),

('Produto-009',
 'Memória RAM XFX 32GB DDR5',
 'XFX', 'Memória Ram', 1,
 389.99, 499.99, 0,
 'assets/img/ram/ram-card.webp',
 'Memória RAM XFX 32GB (2x16GB) DDR5, 6000MHz, CL30, RGB Endereçável, XMP 3.0, compatível com Intel e AMD',
 1),

('Produto-010',
 'Fonte ASUS ROG Thor 850W',
 'ASUS', 'Periféricos', 1,
 699.99, 899.99, 0,
 'assets/img/fonte/fonte-card.webp',
 'Fonte ASUS ROG Thor 850W Platinum Modulada, Display OLED Power, Aura Sync RGB, certificação 80 Plus Platinum',
 1);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-001'), 'assets/img/monitor/monitor-1.webp', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-001'), 'assets/img/monitor/monitor-2.webp', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-001'), 'assets/img/monitor/monitor-3.webp', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-001'), 'assets/img/monitor/monitor-4.webp', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-002'), 'assets/img/gpu/gpu-1.webp', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-002'), 'assets/img/gpu/gpu-2.webp', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-002'), 'assets/img/gpu/gpu-3.webp', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-002'), 'assets/img/gpu/gpu-4.webp', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-003'), 'assets/img/notebook/notebook-1.webp', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-003'), 'assets/img/notebook/notebook-2.webp', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-003'), 'assets/img/notebook/notebook-3.webp', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-003'), 'assets/img/notebook/notebook-4.webp', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-004'), 'assets/img/headset/headset-1.webp', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-004'), 'assets/img/headset/headset-2.webp', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-004'), 'assets/img/headset/headset-3.webp', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-004'), 'assets/img/headset/headset-4.webp', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-005'), 'assets/img/monitorsamsung/monitorsamsung-1.avif', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-005'), 'assets/img/monitorsamsung/monitorsamsung-2.avif', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-005'), 'assets/img/monitorsamsung/monitorsamsung-3.avif', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-005'), 'assets/img/monitorsamsung/monitorsamsung-4.webp', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-006'), 'assets/img/teclado/teclado-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-006'), 'assets/img/teclado/teclado-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-006'), 'assets/img/teclado/teclado-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-006'), 'assets/img/teclado/teclado-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-007'), 'assets/img/ssd/ssd-1.jpg', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-007'), 'assets/img/ssd/ssd-2.jpg', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-007'), 'assets/img/ssd/ssd-3.jpg', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-007'), 'assets/img/ssd/ssd-4.jpg', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-008'), 'assets/img/gabinete/gabinete-1.webp', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-008'), 'assets/img/gabinete/gabinete-2.webp', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-008'), 'assets/img/gabinete/gabinete-3.webp', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-008'), 'assets/img/gabinete/gabinete-4.webp', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-009'), 'assets/img/ram/ram-1.webp', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-009'), 'assets/img/ram/ram-2.webp', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-009'), 'assets/img/ram/ram-3.webp', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-009'), 'assets/img/ram/ram-4.webp', 4);

INSERT INTO product_images (id_product, image_path, sort_order) VALUES
((SELECT id_product FROM product WHERE sku = 'Produto-010'), 'assets/img/fonte/fonte-card.webp', 1),
((SELECT id_product FROM product WHERE sku = 'Produto-010'), 'assets/img/fonte/fonte-card.webp', 2),
((SELECT id_product FROM product WHERE sku = 'Produto-010'), 'assets/img/fonte/fonte-card.webp', 3),
((SELECT id_product FROM product WHERE sku = 'Produto-010'), 'assets/img/fonte/fonte-card.webp', 4);