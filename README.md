RealityConnect-Hackathon
========================

Our project for the Koding #hackathon


Installation
============
	- Download and extract

	- npm install

	- bower install


Config
======

	- Set PROJECT-NAME in ./package.json and ./bower.js

	- Set PROJECT-NAME and LICENSE-KEY in ./newrelic.js

	- Set MONGODB-SERVER in ./server/datasources.json

	- Set API_URL in ./Gruntfile.js

	- Set api keys in ./server/providers.json


Extras
======

You can use ./nginx.conf as a starting point for nginx configuration.
Edit all APP_ROOT_FOLDER, SEO4AJAX_API_KEY (some might be repeated, make sure you edit all of them)
Copy ./nginx.conf to /etc/nginx/sites-available/

Alternatively, if you want ssl configuration do the above steps with nging_ssl.conf and place your certificate files in:
 
	- /opt/nginx/ssl_certs/server.pem
	- /opt/nginx/ssl_certs/server.key
 	- /opt/nginx/ssl_certs/dhparam.pem
 	- /opt/nginx/ssl_certs/godaddy_ssl_trusted_certificate.pem

(this configuration will grant you A+ grade security)