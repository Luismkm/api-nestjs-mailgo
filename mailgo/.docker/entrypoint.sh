#!/bin/bash

cd /home/nestjs/mailgo

yarn install
npx prisma migrate dev
yarn run start:dev