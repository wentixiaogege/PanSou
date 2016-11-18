module.exports = {
  servers: {
    one: {
      host: '101.200.40.222',
      username: 'root',
      // pem:
      password: 'jieGE253018!'
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'wentixiaogege',
    path: './',
    servers: {
      one: {}
    },
    volumes: { // lets you add docker volumes (optional)
      // "/host/path": "/container/path", // passed as '-v /host/path:/container/path' to the docker run command
      // "/second/host/path": "/second/container/path"
    },
    docker: {
      // image: 'kadirahq/meteord', // (optional)
      image: 'abernix/meteord:base', // use this image if using Meteor 1.4+
      args:[ // lets you add/overwrite any parameter on the docker run command (optional)
        //"--link=myCustomMongoDB:myCustomMongoDB", // linking example
        "--memory-reservation 200M" // memory reservation example
      ]
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://www.wentixiaogege.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 1500
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};