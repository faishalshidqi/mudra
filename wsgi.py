from app import app
import os
import socket

if __name__ == '__main__':
    socket.setdefaulttimeout(300)
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get("PORT")))
