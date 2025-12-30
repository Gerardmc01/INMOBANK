import urllib.request
import urllib.error
import re
import json

# URL BOE BARCELONA VIVIENDAS
URL = "https://subastas.boe.es/subastas_ava.php?campo%5B0%5D=SUBASTA.ESTADO&dato%5B0%5D=EJECUTANDOSE&campo%5B2%5D=BIEN.TIPO&dato%5B2%5D=I&campo%5B13%5D=BIEN.PROVINCIA&dato%5B13%5D=08"

# Headers manuales
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
}

def fetch_native():
    print(f"📡 Conectando (Nativo) al BOE...")
    try:
        req = urllib.request.Request(URL, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
        print(f"✅ Descargados {len(html)} bytes de HTML.")
        
        # Extracción vía REGEX (Dirty but works without BS4)
        # Buscamos patrones de enlaces a detalle de subasta
        # href="detalleSubasta.php?idSub=SUB-JA-2024-XXXX"
        
        pattern = r'href="(detalleSubasta\.php\?idSub=SUB-[^"]+)"[^>]*>([^<]+)</a>'
        matches = re.findall(pattern, html)
        
        auctions = []
        seen_ids = set()
        
        print(f"🔎 Analizando patrones en el código fuente...")
        
        for link, title in matches:
            # Limpiar
            clean_title = title.strip()
            # Extraer ID
            id_match = re.search(r'(SUB-\w+-\d+-\d+)', link)
            sub_id = id_match.group(1) if id_match else "UNK"
            
            if sub_id in seen_ids or len(clean_title) < 5:
                continue
                
            seen_ids.add(sub_id)
            
            auctions.append({
                "id": sub_id,
                "title": clean_title,
                "url": "https://subastas.boe.es/" + link,
                "price": "Ver en BOE", # Difícil extraer precio exacto con regex sin estructura compleja
                "status": "ACTIVA"
            })
            
        return auctions

    except Exception as e:
        print(f"❌ Error: {e}")
        return []

if __name__ == "__main__":
    data = fetch_native()
    print(f"📦 Encontradas {len(data)} subastas reales.")
    
    # Guardar en data/real_auctions.json
    with open('../data/real_auctions.json', 'w') as f:
        json.dump(data, f, indent=2)
