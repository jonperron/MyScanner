#!/usr/bin/env python
# -*- encoding: utf8 -*-

"""
Contains all cybersec functions used by the Tornado server.

So far it includes:
- Hostname resolve
- Port scanner
"""

import socket

__author__ = "Jonathan Perron"
__license__ = "MIT License"
__version__ = "0.1"
__maintainer__ = "Jonathan Perron"
__email__ = "contact@jonathanperron.fr"


def hostname_resolve(hostname):
    """
    Providing hostname, returns the IP. If exception, None is returned.
    :param hostname
    :return:
    """
    try:
        resolve = socket.gethostbyname(hostname)
        failed = False
        return resolve,failed
    except socket.gaierror:
        resolve = None
        failed = True
        return resolve, failed


def port_scanner(hostname,port):
    """
    Scan the port on the target hostname, indicating if it is open or close.
    :param hostname:
    :param first_port:
    :param last_port:
    :return:
    """

    hostname_ip,failure = hostname_resolve(hostname)

    if not failure:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            result = sock.connect_ex((hostname_ip, port))
            if result == 0:
                status = "OPEN"
            else:
                status = "CLOSE"
        except socket.gaierror:
            status = "HOSTNOTAVAIL"
        except socket.error:
            status = "COULDNOTCONNECT"
    else:
        status = "HOSTNOTAVAIL"

    return status
