
lessc styles/bplayer.less >styles/bplayer.css

# run the python script
python3 build_script.py
rm -rf __pycache__

# minify the bplayer.js file
#uglifyjs -c -m -o scripts/bplayer.min.js scripts/bplayer.js
