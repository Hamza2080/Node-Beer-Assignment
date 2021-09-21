# Categories-test

### Running server
npm run start OR node .

### Seeding data in mongoDB on port 27017
npm run seed

### Unit test
npm run test

### Docker setup
ATM we have setup docker-compose file, which first run
 - mongoDB in a container on port 27017
 - run nodejs server on port 3003, link mongoDB (container) with this nodeJS container on port 3003
 - run swagger docs on /api-docs

 - sudo docker-compose up --build -d
 - sudo docker logs --tail 100 containerId