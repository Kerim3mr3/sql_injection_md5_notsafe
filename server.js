require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware'ler
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Veritabanı bağlantısı
const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) console.error('Veritabanı hatası:', err);
    else console.log('Veritabanı bağlantısı başarılı!');
});

// Tablo oluşturma
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT,
        password TEXT
    )`);
});

// Sayfalar
app.get(['/', '/login', '/register', '/about'], (req, res) => {
    res.sendFile(__dirname + `/public${req.path}.html`);
});

// Kayıt işlemi (Kasıtlı açık)
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = md5(password);
    
    db.run(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`, 
    function(err) {
        if (err) return res.status(400).send(`
            <h2>Kayıt Başarısız</h2>
            <p>${err.message}</p>
            <a href="/register">Geri Dön</a>
        `);
        
        res.send(`
            <h2>Kayıt Başarılı!</h2>
            <p>Kullanıcı adı: ${username}</p>
            <a href="/login">Giriş Yap</a>
        `);
    });
});

// Giriş işlemi (Normal arayüz)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = md5(password);
    
    db.get(`SELECT * FROM users WHERE username = '${username}' AND password = '${hashedPassword}'`, 
    (err, row) => {
        if (err) return res.status(500).send('Sunucu hatası');
        
        if (row) {
            req.session.user = row;
            return res.redirect('/');
        }
        
        res.send(`
            <h2>Giriş Başarısız</h2>
            <p>Kullanıcı adı veya şifre hatalı</p>
            <a href="/login">Tekrar Dene</a>
        `);
    });
});

// SQLMap testleri için özel endpoint
app.post('/vulnerable_login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${md5(password)}'`;
    
    db.get(query, (err, row) => {
        if (err) return res.status(500).send(query + "\n" + err.message);
        res.send(row ? "TRUE\n" + query : "FALSE\n" + query);
    });
});

// Oturum bilgisi
app.get('/session', (req, res) => {
    res.json(req.session.user ? 
        { loggedIn: true, username: req.session.user.username } : 
        { loggedIn: false }
    );
});

// Çıkış işlemi
app.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${port}`);
    console.log('SQL Injection test endpointi: POST /vulnerable_login');
});