echo $(pwd)

forever stop ../app/main.js

rm -Rf ../app
mkdir ../app

mv bundle.tar.gz ../app/bundle.tar.gz

#meteor bundle ../app/bundle.tar.gz
cd ..
cd app
tar -xvzf bundle.tar.gz
echo $(pwd)

cd bundle/programs/server/node_modules
rm -Rf fibers
npm install fibers@1.0.0
cd ..
cd ..
cd ..
echo $(pwd)
export MONGO_URL='mongodb://localhost'
export ROOT_URL='http://evo.zzzeal.com'
export PORT=2009
forever start main.js