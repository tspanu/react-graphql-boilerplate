1. Update PRISMA_ENDPOINT for all three environments. Use app name for the service and correct stage for the stage name.
2. Ensure local Docker and production (Prisma Cloud) instances of Prisma are running.
3. $ heroku login. $prisma login. Deploy Prisma to all three environments. From the prisma directory, use $ prisma deploy -e ../config/{env}.env.
4. npm i
5. npm run test
6. npm run dev
7. heroku create to create new Heroku project
8. heroku config:set KEY=VALUE for all three env variables
9. git push heroku master
   