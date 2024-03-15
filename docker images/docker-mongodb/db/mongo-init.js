db = db.getSiblingDB('lunna_db')


db.createUser({
    user: 'mongoadmin',
    pwd: 'RootL3g3ndary++!',
    roles: [
      {
        role: 'dbOwner',
      db: 'lunna_db',
    },
  ],
});


 