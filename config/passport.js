const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const db = require('./connection');
const lib = require('./lib');

passport.serializeUser(async (user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const query = "SELECT * FROM hl_model_db.users WHERE id='"+id+"';";
    let user = await db(query);
    done(null, user[0]);
});

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, email, password, done) => {
        const query = "SELECT * FROM hl_model_db.users WHERE email='"+req.body.email+"';";
        let users = await db(query);
        
        if (users.length) {
            return done(null, false, req.flash('signupMessage', 'Este usuário já está cadastrado.'));
        } else {
            const newPartner = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: bcrypt.hashSync(password, null, null)
            };
            
            const insertQuery = "INSERT INTO hl_model_db.users (name, email, phone, password) values ('"
            +newPartner.name+"', '"
            +newPartner.email+"', '"
            +newPartner.phone+"', '"
            +newPartner.password+"')";

            db(insertQuery)
                .then(row => {
                    newPartner.id = row.insertId;
                    return done(null, newPartner);
                })
                .catch(err => {
                    console.log(err);
                    return;
                });
        };
    })
);

passport.use(
    'local-login',
    new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, email, password, done) => {
        const query = "SELECT * FROM hl_model_db.users WHERE email = '"+email+"';";
        let users = await db(query);
        
        if (!users.length){
            return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.'))
        };
        
        if (!bcrypt.compareSync(password, users[0].password)){
            return done(null, false, req.flash('loginMessage', 'Senha inválida.'));
        };

        
        return done(null, users[0]);
    })
);

module.exports = passport;