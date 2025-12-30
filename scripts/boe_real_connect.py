import requests
from bs4 import BeautifulSoup
import json
import time

# URL REAL de búsqueda: Subastas de BIENES INMUEBLES en BARCELONA en estado EJECUTÁNDOSE
# Nota: Los parámetros del BOE son complejos, usamos una URL base estándar.
REAL_SEARCH_URL = "https://subastas.boe.es/subastas_ava.php?campo[0]=SUBASTA.ESTADO&dato[0]=EJECUTANDOSE&campo[2]=BIEN.TIPO&dato[2]=I&campo[13]=BIEN.PROVINCIA&dato[13]=08"

# Headers críticos para evitar bloqueo (User-Agent de Chrome)
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'es-ES,es;q=0.9'
}

def fetch_real_boe_data():
    print(f"📡 Conectando al BOE: {REAL_SEARCH_URL}...")
    
    try:
        session = requests.Session()
        resp = session.get(REAL_SEARCH_URL, headers=HEADERS, timeout=10)
        
        if resp.status_code != 200:
            print(f"❌ Error HTTP {resp.status_code}. El BOE bloqueó la petición.")
            return []
            
        print("✅ Respuesta recibida (200 OK). Analizando HTML...")
        
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # El BOE muestra los resultados en una lista o tabla.
        # Buscamos elementos contenedores de resultados.
        # (La estructura de clases actual suele ser 'resultado-busqueda' o items dentro de un listado)
        
        auctions = []
        
        # Estrategia de parseo genérica para encontrar bloques de subastas
        # Buscamos enlaces que contengan "ver_detalle" que son las fichas
        rows = soup.find_all('li', class_='resultado-busqueda')
        
        if not rows:
            # Fallback a búsqueda de tabla si cambian el diseño
            rows = soup.find_all('tr', class_='linea')

        print(f"🔎 Encontrados {len(rows)} posibles lotes. Procesando...")

        for row in rows:
            try:
                # Intentamos extraer datos básicos
                # Título
                title_tag = row.find('h3') or row.find('a', title=True)
                title = title_tag.get_text(strip=True) if title_tag else "Subasta sin título"
                
                # Link
                link_tag = row.find('a', href=True)
                link = "https://subastas.boe.es/" + link_tag['href'] if link_tag else "#"
                
                # Referencia (Suele estar en un strong o div específico)
                ref = "REF-BOE-UNK"
                # Extracción simple de texto para buscar patrones
                text_content = row.get_text(" ", strip=True)
                
                # Precio/Valor (Busqueda heurística)
                # Buscamos patrones de €
                
                auctions.append({
                    "titulo": title,
                    "url_boe": link,
                    "raw_text": text_content[:200] + "..." # Guardamos resumen para debug
                })
                
            except Exception as e:
                print(f"⚠️ Error parseando una fila: {e}")
                continue

        return auctions

    except Exception as e:
        print(f"❌ Error fatal de conexión: {e}")
        return []

def save_data(data):
    if not data:
        print("⚠️ No hay datos para guardar.")
        return
        
    path = '../data/real_boe_data.json'
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"💾 {len(data)} subastas reales guardadas en {path}")

if __name__ == "__main__":
    data = fetch_real_boe_data()
    save_data(data)
