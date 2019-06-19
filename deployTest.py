# -*- coding: utf-8 -*-
from Savoir.Savoir import Savoir

rpcuser = 'multichainrpc'
rpcpasswd = 'this-is-insecure-change-it'
rpchost = 'localhost'
rpcport = '8001'
chainname = 'MyChain'

api = Savoir(rpcuser, rpcpasswd, rpchost, rpcport, chainname)

with open("deployReady.js", 'r') as js_file:
    js = js_file.read()
    print(api.create('txfilter', 'smartFilter1', {}, js))