from flask import Flask 
from flask import Response,send_file

import os

app=Flask(__name__)

@app.route("/")
def init():
	file=os.path.join(os.path.abspath(os.getcwd()),"index.html")
	return Response(open(file).read(),mimetype="text/html")

@app.route("/<filepath>")
def root(filepath):
	file=os.path.join(os.path.abspath(os.getcwd()),filepath)
	return Response(open(file).read(),mimetype="text/javascript")

@app.route("/styles/<filepath>")
def styles(filepath):
	file=os.path.join(os.path.abspath(os.getcwd()),'styles',filepath)
	return Response(open(file).read(),mimetype="text/css")

@app.route("/lng/<filepath>")
def lng(filepath):
	file=os.path.join(os.path.abspath(os.getcwd()),'lng', filepath)
	return Response(open(file).read(),mimetype="text/javascript")

@app.route("/json/<filepath>")
def json(filepath):
	file=os.path.join(os.path.abspath(os.getcwd()),'json',filepath)
	return Response(open(file).read(),mimetype="text/javascript")

@app.route("/layers/<filepath>")
def layers(filepath):
	file=os.path.join(os.path.abspath(os.getcwd()),'layers',filepath)
	return Response(open(file).read(),mimetype="text/javascript")

@app.route("/fotos/<filename>")
def fotos(filename):
	file=os.path.join(os.path.abspath(os.getcwd()),'fotos',filename)
	return send_file(file, mimetype="image/png")

@app.route("/vendor/leaflet/<filename>")
def leaflet(filename):
	file=os.path.join(os.path.abspath(os.getcwd()),'vendor/leaflet',filename)
	if file[-3:]=="css":
		return Response(open(file).read(),mimetype="text/css")
	else:
		return Response(open(file).read(),mimetype="text/javascript")

@app.route("/vendor/Leaflet.Canvas-Flowmap-Layer-master/src/<filename>")
def flowmap(filename):

	file=os.path.join(os.path.abspath(os.getcwd()),'vendor/Leaflet.Canvas-Flowmap-Layer-master/src',filename)
	return Response(open(file).read(),mimetype="text/javascript")


if __name__=="__main__":
	app.run()