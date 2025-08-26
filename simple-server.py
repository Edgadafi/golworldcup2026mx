#!/usr/bin/env python3
import http.server
import socketserver
import datetime

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            
            current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Servidor de Prueba - Funcionando</title>
                <meta charset="utf-8">
                <style>
                    body {{ font-family: Arial, sans-serif; margin: 40px; background: #f0f0f0; }}
                    .container {{ background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
                    h1 {{ color: #2c3e50; }}
                    .success {{ color: #27ae60; font-weight: bold; }}
                    .info {{ background: #3498db; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🎉 ¡Servidor de Prueba Funcionando!</h1>
                    <p class="success">Si puedes ver esta página, el problema NO es de conectividad básica.</p>
                    
                    <div class="info">
                        <strong>Información del servidor:</strong><br>
                        Puerto: {PORT}<br>
                        Hora: {current_time}<br>
                        Estado: ✅ Funcionando correctamente
                    </div>
                    
                    <h3>Diagnóstico:</h3>
                    <ul>
                        <li>✅ Servidor HTTP funcionando</li>
                        <li>✅ Puerto {PORT} accesible</li>
                        <li>✅ Conectividad básica OK</li>
                        <li>❓ El problema puede ser específico de Next.js</li>
                    </ul>
                    
                    <p><strong>Próximo paso:</strong> Si ves esta página, el problema está en la configuración de Next.js, no en tu sistema.</p>
                </div>
            </body>
            </html>
            """
            
            self.wfile.write(html_content.encode('utf-8'))
        else:
            super().do_GET()

if __name__ == "__main__":
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
            print(f"🚀 Servidor de prueba ejecutándose en:")
            print(f"   Local: http://localhost:{PORT}")
            print(f"   Red: http://0.0.0.0:{PORT}")
            print(f"   Presiona Ctrl+C para detener")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
    except Exception as e:
        print(f"❌ Error al iniciar el servidor: {e}")


