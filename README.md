# Library Reservation System

> A Vue.js project
>IMPORTANT!
>Now the frontend communicates with the backend server that is deployed on our linux machine with
>url: http://cuoshen.online:443. This server is running the same code as we submitted. But in case
>you want to test with server deployed on you own machine with url: localhost:PORT, please go to
>library_simulator_frontend/config/index.js, and change all occurences of http://cuoshen.online:443
>to your localhost address and corresponding port. This is a proxy table to solve cross origin issues.
>However, if the cross origin issue still appears (depends on the browser), you can switch back to 
>http://cuoshen.online:443 to test our system.

## Clone

``` bash
git clone https://github.com/siwei-yuan/LibrarySimulator_Frontend.git
cd library_simulator_frontend
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Frontend Features
1. Reserve/cancel study room
2. Filter the study rooms
3. Occupy/leave a library seat
4. Intuitive map view of all seats
5. Notification center
6. Change your profile
7. Sign-up and login (auto login)

## Frontend Tech Stack
1. Node.js
2. Vue
3. Ant Design
4. Axios
5. Vue-cli Proxy List
