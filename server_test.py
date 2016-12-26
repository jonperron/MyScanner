#!/usr/bin/env python
# -*- encoding: utf8 -*-

"""
Tests for the back-end
"""

import unittest
import subprocess
import server

from tornado.testing import AsyncHTTPTestCase
from urllib.request import urlopen
from websocket import create_connection

__author__ = "Jonathan Perron"
__license__ = "MIT License"
__version__ = "0.1"
__maintainer__ = "Jonathan Perron"
__email__ = "contact@jonathanperron.fr"

class TestBackEnd(AsyncHTTPTestCase):
	def get_app(self):
		return server.main()

	def test_homepage_isalive(self):
		page = self.fetch('/')
		self.assertEqual(page.code,200)

	# def test_hostname_isalive(self):
	# 	page = urlopen('http://localhost:8001/get_hostname/?hostname=localhost')
	# 	self.assertEqual(a.msg,'OK')

	# def test_websocket_isalive(self):
	# 	ws = create_connection('ws://127.0.0.1:8001/scan_port/')
	# 	self.assertEqual(ws.recv(),'Scan in progress')

if __name__ == '__main__':
	unittest.main()