const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
const cors = require("cors");
app.use(cors());
const md5 = require('js-md5');
const uuid = require('uuid');
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "idejos",
});

////////////////////LOGIN/////////////////

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/server')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 10) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login') || 0 === req.url.indexOf('/register')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
    const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error', status: 1 }); // user not logged
        } else {
            if ('admin' === req.query.role) {
                if (result[0].role !== 10) {
                    res.send({ msg: 'error', status: 2 }); // not an admin
                } else {
                    res.send({ msg: 'ok', status: 3 }); // is admin
                }
            } else {
                res.send({ msg: 'ok', status: 4 }); // is user
            }
        }
    });
});

app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.status(401).send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key, text: 'Good to see you ' + req.body.user + ' again.', type: 'info' });
        }
    });
});

app.post("/register", (req, res) => {
    const key = uuid.v4();
    const sql = `
    INSERT INTO users (name, psw, session)
    VALUES (?, ?, ?)
  `;
    con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'ok', key, text: 'Welcome!', type: 'info' });
    });
});

///////////////////END////////////////////


//CREATE
app.post("/home/ideas", (req, res) => {
    const sql = `
    INSERT INTO ideas (title, post, price, image)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.title, req.body.post, req.body.price, req.body.image], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'New idea was added.', type: 'success' });
    });
});

app.post("/home/reals/:id", (req, res) => {
    const sql = `
    INSERT INTO reals (ideas_id)
    VALUES (?)
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Thanks, for commenting.', type: 'info' });
    });
});

app.post("/home/prop", (req, res) => {
    const sql = `
    INSERT INTO prop (id, title, post, price, image)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.params.id, req.body.title, req.body.post, req.body.price, req.body.image], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Project was confirmed.', type: 'success' });
    });
});

app.post("/home/donat", (req, res) => {
    const sql = `
    INSERT INTO donat (name, sum)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.name, req.body.sum], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Donation was performed!', type: 'success' });
    });
});
// app.get("/home/ideas", (req, res) => {
//     const sql = `
//     SELECT *
//     FROM ideas
//     ORDER BY id DESC
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });
app.get("/home/reals/", (req, res) => {
    const sql = `
    SELECT r.*, i.id AS iid, i.title, i.post, i.price 
    FROM ideas AS i
    LEFT JOIN reals AS r
    ON r.ideas_id = i.id
    ORDER BY r.id
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/server/reals/wc", (req, res) => {
    const sql = `
    SELECT r.*, i.id AS iid, i.title, i.post, i.price, i.image 
    FROM ideas AS i
    LEFT JOIN reals AS r
    ON r.ideas_id = i.id
    ORDER BY r.id
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/home/ideas", (req, res) => {
    const sql = `
    SELECT i.*, r.id AS rid 
    FROM ideas AS i
    LEFT JOIN reals AS r
    ON r.id = i.id
    ORDER BY i.title
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/home/ideas/wc", (req, res) => {
    const sql = `
    SELECT *
    FROM ideas
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/home/prop", (req, res) => {
    const sql = `
    SELECT p.*, d.id AS did, d.name, d.sum 
    FROM prop AS p
    LEFT JOIN donat AS d
    ON d.id = p.id
    ORDER BY p.title
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



//DELETE
app.delete("/server/ideas/:id", (req, res) => {
    const sql = `
    DELETE FROM ideas
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The movie was deleted.', type: 'info' });
    });
});
app.delete("/server/reals/:id", (req, res) => {
    const sql = `
    DELETE FROM reals
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Bad comment was deleted.', type: 'info' });
    });
});


//EDIT
app.put("/home/ideas/:id", (req, res) => {
    const sql = `
    UPDATE ideas
    SET 
    rating_sum = rating_sum + ?, 
    rating_count = rating_count + 1, 
    rating = rating_sum / rating_count
    WHERE id = ?
    `;
    con.query(sql, [req.body.rate, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Thanks, for your vote.', type: 'info' });
    });
});

app.put("/server/reals/:id", (req, res) => {
    const sql = `
    UPDATE reals
    SET 
    orderis = ?
    WHERE id = ?
    `;
    con.query(sql, [ req.body.confirmed, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Thanks, for your vote.', type: 'info' });
    });
});

app.put("/server/ideas/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE ideas
        SET title = ?, post = ?, price = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.title,req.body.post, req.body.price, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE ideas
        SET title = ?, post = ?, price = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.title,req.body.post, req.body.price, req.body.image, req.params.id];
    } else {
        sql = `
        UPDATE ideas
        SET title = ?, post = ?, price = ?
        WHERE id = ?
        `;
        r = [req.body.title,req.body.post, req.body.price, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The idea was edited.', type: 'success' });
    });
});

app.listen(port, () => {
    console.log(`Filmus rodo per ${port} portą!`)
});






// // READ
// // SELECT column1, column2, ...
// // FROM table_name;

// // app.get("/trees/:tipas", (req, res) => {

// //     // console.log(req.query.sort);

// //     const sql = `
// //     SELECT id, type, title, height
// //     FROM trees
// //     WHERE type = ? OR type = ?
// //     `;
// //     con.query(sql, [req.params.tipas, req.query.sort], (err, result) => {
// //         if (err) throw err;
// //         res.send(result);
// //     });
// // });

// // INNER JOIN
// // SELECT column_name(s)
// // FROM table1
// // INNER JOIN table2
// // ON table1.column_name = table2.column_name;
// app.get("/get-it/inner-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     INNER JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/left-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     LEFT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/right-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     RIGHT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });





// // READ (all)
// app.get("/trees", (req, res) => {
//     const sql = `
//     SELECT id, type, title, height
//     FROM trees
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// //CREATE
// // INSERT INTO table_name (column1, column2, column3, ...)
// // VALUES (value1, value2, value3, ...);
// app.post("/trees", (req, res) => {
//     const sql = `
//     INSERT INTO trees (title, height, type)
//     VALUES (?, ?, ?)
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //DELETE
// // DELETE FROM table_name WHERE condition;
// app.delete("/trees/:id", (req, res) => {
//     const sql = `
//     DELETE FROM trees
//     WHERE id = ?
//     `;
//     con.query(sql, [req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //EDIT
// // UPDATE table_name
// // SET column1 = value1, column2 = value2, ...
// // WHERE condition;
// app.put("/trees/:id", (req, res) => {
//     const sql = `
//     UPDATE trees
//     SET title = ?, height = ?, type = ?
//     WHERE id = ?
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type, req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });