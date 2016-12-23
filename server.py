#!/usr/bin/env python
# -*- encoding: utf8 -*-

"""
Tornado server used as back-end. The server is running on port 8001 by default.
"""
# Tornado modules
import tornado.httpserver
import tornado.ioloop
import tornado.web
import tornado.websocket

# Other modules
from .functions import *
from datetime import datetime
import json

__author__ = "Jonathan Perron"
__license__ = "MIT License"
__version__ = "0.1"
__maintainer__ = "Jonathan Perron"
__email__ = "contact@jonathanperron.fr"

# Define port
from tornado.options import define, options
define("port",default=8001,help="run on the given port",type=int)

# Request handlers
class AliveHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(json.dumps("Server alive"))


class GetHostnameHandler(tornado.web.RequestHandler):
    def get(self):
        hostname = self.get_argument("hostname",None,True)
        resolved_name, failure = hostname_resolve(hostname)
        if failure:
            self.render(json.dumps("Could not resolve this hostname."))
        else:
            self.render(json.dumps("IP: " + resolved_name))


class ScanPortHandler(tornado.websocket.WebSocketHandler):
    def open(self):


# Tornado Application
class App(tornado.web.Application):
    def __init__(self):
        handlers = [
            tornado.web.url(r"^/$",AliveHandler,name="home"),
            tornado.web.url(r"^/get_hostname/$",GetHostnameHandler,name="get_hostname"),
            tornado.web.url(r"^/scan_port/$",ScanPortHandler,name="scan_port"),
        ]
        settings = [
            'autoreload' : True,
            'default_handler_class' : tornado.web.RedirectHandler,
            'default_handler_args' : {"url":"/"},
        ]
        super(Application, self).__init__(handlers, **settings)

def main():
    http_server = tornado.httpserver.HTTPServer(App())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()

# Time to start the server !
if __name__ == "__main__":
    main()