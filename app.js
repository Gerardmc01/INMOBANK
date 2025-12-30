document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('locationInput');
    const priceInput = document.getElementById('priceInput');
    const typeInput = document.getElementById('typeInput');

    const locationDisplay = document.getElementById('locationDisplay');
    const totalCount = document.getElementById('totalCount');
    const grid = document.getElementById('propertyGrid');
    const skeleton = document.getElementById('skeletonLoader');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // --- BASE DE DATOS MASIVA (AGREGADOR COMPLETO) ---
    // Incluye todos los servicers principales de España.

    const DATABASE = [
        // --- DESTACADO (Solicitado) ---
        {
            id: 'altamira-usera-real',
            bank: 'Altamira',
            bankClass: 'altamira',
            title: 'Cesión de Remate: C/ Amor Hermoso 5 (Madrid)',
            desc: 'Vivienda de 102m² con 4 dormitorios en pleno Usera. Oportunidad de inversión mediante Cesión de Remate. Alta rentabilidad estimada.',
            location: 'Madrid (Usera)',
            price: 230000,
            oldPrice: 285000,
            features: ['102', '4', '2'],
            tags: ['Santander', 'Cesión Remate'],
            img: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600',
            // Enlace especial para abrir modal
            link: '#modal-amor-hermoso',
            type: 'vivienda'
        },

        // --- GRUPO SANTANDER ---
        {
            id: 'altamira-general',
            bank: 'Altamira',
            bankClass: 'altamira',
            title: 'Buscador General Altamira (Santander)',
            desc: 'Todo el portal inmobiliario del Banco Santander. Viviendas, locales y suelos en toda España.',
            location: 'Toda España',
            price: 85000,
            oldPrice: 110000,
            features: ['Var', 'Var', 'Var'],
            tags: ['Santander', 'Catálogo Completo'],
            img: 'https://images.unsplash.com/photo-1460317442991-0ec1dacd853e?w=600',
            link: 'https://www.altamirainmuebles.com/venta-viviendas/cualquier-provincia',
            type: 'vivienda'
        },
        {
            id: 'aliseda-general',
            bank: 'Aliseda',
            bankClass: 'aliseda',
            title: 'Aliseda Inmobiliaria (Santander/Popular)',
            desc: 'Gestora de activos del Banco Popular/Santander. Grandes oportunidades en costa y segunda residencia.',
            location: 'Toda España',
            price: 75000,
            oldPrice: 95000,
            features: ['Var', 'Var', 'Var'],
            tags: ['Santander', 'Popular'],
            img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600',
            link: 'https://www.alisedainmobiliaria.com/',
            type: 'vivienda'
        },
        {
            id: 'casaktua-general',
            bank: 'Casaktua',
            bankClass: 'casaktua',
            title: 'Casaktua (Intrum)',
            desc: 'Portal con financiación accesible. Ideal para compradores de primera vivienda con presupuesto ajustado.',
            location: 'Toda España',
            price: 60000,
            oldPrice: 80000,
            features: ['Var', 'Var', 'Var'],
            tags: ['Financiación', 'Low Cost'],
            img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600',
            link: 'https://www.casaktua.com/',
            type: 'vivienda'
        },

        // --- BBVA / CAIXA / SABADELL ---
        {
            id: 'bbva-solvia',
            bank: 'BBVA Vivienda',
            bankClass: 'bbva',
            title: 'Portal Inmobiliario BBVA',
            desc: 'Gestionado por Solvia. Accede a la cartera exclusiva de inmuebles propiedad del BBVA.',
            location: 'Toda España',
            price: 95000,
            oldPrice: 130000,
            features: ['Var', 'Var', 'Var'],
            tags: ['BBVA', 'Calidad'],
            img: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=600',
            link: 'https://www.solvia.es/es/comprar/bbva',
            type: 'vivienda'
        },
        {
            id: 'servihabitat-general',
            bank: 'Servihabitat',
            bankClass: 'servihabitat',
            title: 'Servihabitat (CaixaBank / Coral Homes)',
            desc: 'La mayor cartera de España. Pisos, casas y promociones de obra nueva de La Caixa.',
            location: 'Toda España',
            price: 88000,
            oldPrice: 115000,
            features: ['Var', 'Var', 'Var'],
            tags: ['CaixaBank', 'Líder Mercado'],
            img: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=600',
            link: 'https://www.servihabitat.com/es/land/residencial/venta/vivienda',
            type: 'vivienda'
        },
        {
            id: 'solvia-general',
            bank: 'Solvia',
            bankClass: 'solvia',
            title: 'Solvia Inmobiliaria (Sabadell)',
            desc: 'Referente en el sector. Asesoramiento personal y activos del Banco Sabadell y SAREB.',
            location: 'Toda España',
            price: 65000,
            oldPrice: 80000,
            features: ['Var', 'Var', 'Var'],
            tags: ['Sabadell', 'Servicio Premium'],
            img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600',
            link: 'https://www.solvia.es/es/comprar/viviendas',
            type: 'vivienda'
        },

        // --- OTROS BANCOS Y REGIONALES ---
        {
            id: 'haya-general',
            bank: 'Haya Real Estate',
            bankClass: 'haya',
            title: 'Haya Real Estate (Multimarca)',
            desc: 'Comercializa activos de Cajamar, Liberbank y otros fondos. Muy fuerte en zonas rurales y costa.',
            location: 'Toda España',
            price: 55000,
            oldPrice: 75000,
            features: ['Var', 'Var', 'Var'],
            tags: ['Cajamar', 'Rural'],
            img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600',
            link: 'https://www.haya.es/viviendas/',
            type: 'vivienda'
        },
        {
            id: 'bankinter-general',
            bank: 'Bankinter',
            bankClass: 'bankinter',
            title: 'Bankinter Inmuebles',
            desc: 'Portal especializado en viviendas de calidad media-alta con financiación propia del banco.',
            location: 'Toda España',
            price: 180000,
            oldPrice: 220000,
            features: ['Var', 'Var', 'Var'],
            tags: ['Bankinter', 'Premium'],
            img: 'https://images.unsplash.com/photo-1600596542815-2a4fe041d95e?w=600',
            link: 'https://www.bankinter.com/www/es-es/cgi/ebk+inm+home',
            type: 'vivienda'
        },
        {
            id: 'ibercaja-general',
            bank: 'Ibercaja',
            bankClass: 'ibercaja',
            title: 'Ibercaja Inmuebles',
            desc: 'Gran presencia en Aragón, La Rioja y Madrid. Condiciones hipotecarias ventajosas.',
            location: 'Toda España',
            price: 92000,
            oldPrice: 110000,
            features: ['Var', 'Var', 'Var'],
            tags: ['Ibercaja', 'Aragón/Madrid'],
            img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
            link: 'https://www.ibercajainmobiliaria.com/',
            type: 'vivienda'
        },

        // --- DESTACADOS REGIONALES (Gancho visual) ---
        {
            id: 'alt-bcn-oficial',
            bank: 'Altamira',
            bankClass: 'altamira',
            title: 'Pisos en Barcelona (Santander)',
            desc: 'Viviendas de obra nueva y segunda mano del Banco Santander en Barcelona.',
            location: 'Barcelona',
            price: 145000,
            oldPrice: 180000,
            features: ['Var', 2, 1],
            tags: ['Santander', 'BCN'],
            img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=600',
            link: 'https://www.altamirainmuebles.com/#/results?l=Barcelona,Barcelona',
            type: 'vivienda'
        },
        {
            id: 'solvia-ali-oficial',
            bank: 'Solvia',
            bankClass: 'solvia',
            title: 'Pisos en Alicante Costa',
            desc: 'Tu casa cerca del mar con las mejores condiciones del Banco Sabadell.',
            location: 'Alicante',
            price: 85000,
            oldPrice: 105000,
            features: [70, 2, 1],
            tags: ['Sabadell', 'Costa'],
            img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
            link: 'https://www.solvia.es/es/comprar/viviendas/alicante-provincia',
            type: 'vivienda'
        }
    ];

    // --- FUNCION DE FILTRADO ---
    function applyFilters() {
        const searchText = locationInput.value.toLowerCase();
        const maxPrice = parseInt(priceInput.value);

        // Recuperar bancos seleccionados
        const activeBanks = [];
        document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(row => {
            const rowDiv = row.closest('.filter-row');
            if (row.checked && rowDiv) {
                const nameSpan = rowDiv.querySelector('span:nth-child(2)');
                if (nameSpan) {
                    const name = nameSpan.textContent.toLowerCase();
                    if (name.includes('altamira')) activeBanks.push('altamira');
                    if (name.includes('servihabitat')) activeBanks.push('servihabitat');
                    if (name.includes('solvia')) activeBanks.push('solvia');
                    if (name.includes('haya')) activeBanks.push('haya');
                    if (name.includes('diglo')) activeBanks.push('diglo');
                    if (name.includes('aliseda')) activeBanks.push('aliseda');
                    if (name.includes('casaktua')) activeBanks.push('casaktua');
                    if (name.includes('bankinter')) activeBanks.push('bankinter');
                    if (name.includes('ibercaja')) activeBanks.push('ibercaja');
                    if (name.includes('bbva')) activeBanks.push('bbva');
                }
            }
        });

        const filtered = DATABASE.filter(item => {
            // Text Search Logic
            let effectiveMatchText = item.location.toLowerCase().includes(searchText) ||
                item.title.toLowerCase().includes(searchText);

            // Si busca "España" o nada, mostramos los generales.
            if ((item.location === 'Toda España' || searchText === 'españa') && searchText === '') effectiveMatchText = true;

            const matchesPrice = item.price <= maxPrice;

            // Bank Check
            const bankNameLower = item.bank.toLowerCase();
            const bankClassLower = item.bankClass.toLowerCase();

            if (activeBanks.length === 0) return false;

            const matchesBank = activeBanks.some(b => bankNameLower.includes(b) || bankClassLower.includes(b) || (b === 'diglo' && bankNameLower.includes('diglo')));

            return effectiveMatchText && matchesPrice && matchesBank;
        });

        render(filtered);
    }

    // --- RENDERIZADO ---
    function render(list) {
        grid.innerHTML = '';
        totalCount.innerText = list.length;

        if (list.length === 0) {
            grid.innerHTML = `
                <div style="text-align:center; padding: 60px; grid-column: 1/-1;">
                    <i class="fa-solid fa-house-chimney-crack" style="font-size: 3rem; color: #e5e7eb; margin-bottom: 20px;"></i>
                    <p>No encontramos viviendas con esos filtros.</p>
                    <button id="resetBtn" style="color: var(--primary); text-decoration:underline; border:none; background:none; cursor:pointer; margin-top:10px;">Ver todos los portales</button>
                </div>
            `;
            const reset = document.getElementById('resetBtn');
            if (reset) reset.addEventListener('click', () => {
                locationInput.value = '';
                priceInput.options[3].selected = true; // Sin límite
                document.querySelectorAll('.filters-sidebar input').forEach(i => i.checked = true);
                applyFilters();
            });
            return;
        }

        list.forEach(item => {
            const discount = Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);

            const card = document.createElement('div');
            card.className = 'property-card';
            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${item.img}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400?text=Piso+Banco'">
                    <div class="bank-tag ${item.bankClass}">${item.bank}</div>
                    ${item.tags.length > 0 ? `<div class="status-badge">${item.tags[0]}</div>` : ''}
                </div>
                
                <div class="card-details">
                    <div class="card-header">
                        <div>
                            <h2 class="card-title">${item.title}</h2>
                        </div>
                        <div class="card-actions-top">
                            <button><i class="fa-regular fa-heart"></i></button>
                        </div>
                    </div>

                    <p style="font-size: 0.9rem; color: #4b5563; margin-bottom: 12px; line-height: 1.4;">
                        ${item.desc}
                    </p>

                    <div class="card-location-row">
                        <i class="fa-solid fa-map-pin"></i> ${item.location}
                    </div>

                    <div class="card-features">
                        <div class="feature-item"><i class="fa-solid fa-ruler-combined"></i> ${item.features[0] !== 'Var' ? item.features[0] + ' m²' : 'Consultar'}</div>
                        <div class="feature-item"><i class="fa-solid fa-bed"></i> ${item.features[1] === 'Var' ? '-' : item.features[1]}</div>
                        <div class="feature-item"><i class="fa-solid fa-bath"></i> ${item.features[2] === 'Var' ? '-' : item.features[2]}</div>
                    </div>

                    <div class="card-footer">
                        <div class="price-container">
                            <div class="price-label">Desde</div>
                            <div>
                                <span class="current-price">${item.price.toLocaleString()} €</span>
                                <span class="discount-tag">-${discount}%</span>
                            </div>
                            <span class="old-price">Antes: ${item.oldPrice.toLocaleString()} €</span>
                        </div>
                        
                        ${item.link.startsWith('#') ?
                    `<button class="btn-cta open-modal-btn" data-id="${item.id}" style="cursor:pointer; border:none;">
                                Me interesa <i class="fa-solid fa-envelope"></i>
                             </button>`
                    :
                    `<a href="${item.link}" target="_blank" class="btn-cta">
                                Ver Ficha Oficial <i class="fa-solid fa-arrow-up-right-from-square"></i>
                             </a>`
                }
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // --- EVENT LISTENERS ---

    searchBtn.addEventListener('click', () => {
        grid.classList.add('hidden');
        skeleton.classList.remove('hidden');

        setTimeout(() => {
            skeleton.classList.add('hidden');
            grid.classList.remove('hidden');
            applyFilters();

            if (locationInput.value) locationDisplay.innerText = locationInput.value;
            else locationDisplay.innerText = "España";

        }, 500);
    });

    document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(box => {
        box.addEventListener('change', makeFiltersDebounced);
    });

    // Simple debounce for checkboxes so it doesn't flash if user clicks fast
    let timeout;
    function makeFiltersDebounced() {
        clearTimeout(timeout);
        timeout = setTimeout(applyFilters, 100);
    }

    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBtn.click();
    });

    // Initial Load
    applyFilters();

    // --- MODAL LOGIC FOR LEADS ---
    document.addEventListener('click', (e) => {
        if (e.target.closest('.open-modal-btn')) {
            const btn = e.target.closest('.open-modal-btn');
            const propertyId = btn.getAttribute('data-id');
            showLeadModal(propertyId);
        }
    });

    function showLeadModal(propId) {
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'lead-modal-overlay';
        modal.innerHTML = `
            <div class="lead-modal">
                <button class="close-modal">&times;</button>
                <div style="text-align:center; margin-bottom: 20px;">
                    <i class="fa-solid fa-file-contract" style="font-size: 2.5rem; color: var(--primary);"></i>
                    <h2 style="margin-top:10px; font-size:1.5rem;">Solicita Información</h2>
                    <p style="color:#666; font-size:0.9rem;">Ref: ${propId.toUpperCase()}</p>
                </div>
                
                <form id="leadForm">
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-size:0.8rem; font-weight:700; margin-bottom:5px;">Nombre Completo</label>
                        <input type="text" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;" required placeholder="Tu nombre">
                    </div>
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-size:0.8rem; font-weight:700; margin-bottom:5px;">Teléfono</label>
                        <input type="tel" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;" required placeholder="600 000 000">
                    </div>
                    <div style="margin-bottom:20px;">
                        <label style="display:block; font-size:0.8rem; font-weight:700; margin-bottom:5px;">Mensaje</label>
                        <textarea style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;" rows="3">Hola, estoy interesado en la cesión de remate de C/ Amor Hermoso 5.</textarea>
                    </div>
                    <button type="submit" style="width:100%; padding:12px; background:var(--primary); color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:1rem;">
                        Contactar con Gestor
                    </button>
                    <p style="font-size:0.7rem; color:#999; margin-top:10px; text-align:center;">
                        Al enviar aceptas que un gestor especializado te contacte.
                    </p>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Modal Events
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('#leadForm').addEventListener('submit', (ev) => {
            ev.preventDefault();
            const btn = modal.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Enviado';
            btn.style.background = '#10b981';
            setTimeout(() => {
                modal.remove();
                alert('¡Solicitud enviada! Un gestor te llamará en breve.');
            }, 1000);
        });
    }

});
