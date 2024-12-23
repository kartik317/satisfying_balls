import http.server
import socketserver
import os

PORT = 8116
DIRECTORY = "/storage/emulated/0"  # Make sure this path is correct

# Print the directory contents to verify
print("Directory contents:", os.listdir(DIRECTORY))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()
    
#http://localhost:8116/index.html