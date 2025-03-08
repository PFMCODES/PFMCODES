from flask import Flask, send_file, send_from_directory, abort
import os

app = Flask(__name__, static_folder="static")

@app.route("/")
def home():
    return send_file("index.html")

@app.route("/<path:page>")
def serve_page(page):
    file1 = f"{page}.html"
    file2 = (f"{page}index.html")  # Fix: Check for nested folders

    if os.path.exists(file1):
        return send_file(file1)
    elif os.path.exists(file2):
        return send_file(file2)
    return abort(404)  # If no file found, show 404 page

@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory("static", filename)

@app.errorhandler(404)
def file_not_found(e):
    return send_file("404.html"), 404

if __name__ == "__main__":
    app.run(debug=True)
