#!/usr/bin/env python3

import sys, os
import coffeescript as coff
import json
path = os.path

def get(name):
    f = open(name, 'r', 1)
    r = f.read()
    f.close()
    return r

def put(name, data):
    f = open(name, 'w', 1)
    f.write( data )
    f.close()

def concat(inFiles, outFile):
    data = []
    for n in inFiles:
        d = get( n )
        data.append( d )
    content = '\r'.join( data )
    put(outFile, content)

def coffeec( name ):
    bname, ext = path.splitext( name )
    coffee_code = get( name )
    js_code = coff.compile( coffee_code )
    dest = (bname + '.js')
    put(dest, js_code)

def browserify(src, dest):
    command = ' '.join(['browserify', src, '-o', dest])
    os.system( command )

def uglify(src, dest, compress=True, mangle=True, beautify=False):
    flags = []
    if compress:
        flags.append('-c')
    if mangle:
        flags.append('-m')
    if beautify:
        flags.append('-b')
    words = (['uglifyjs', '-o', dest] + flags + [src])
    os.system(' '.join( words ))

def manifest():
    return json.loads(get('build_manifest.json'))

def main():
    bman = manifest()
    fields = list( bman )

    if ('coffeescript' in fields):
        for name in bman['coffeescript']:
            coffeec(path.join('scripts', name))

    browserify('scripts/bplayer.js', 'scripts/bplayer.pack.js')

    code = 'var exports = {};\n'
    code += get('scripts/worker.js')
    put('scripts/worker.js', code)

if __name__ == '__main__':
    main()
