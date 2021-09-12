let express = require("express");
let mysql = require("promise-mysql");
let app = express();
let bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mysql
  .createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "demoweb9_bxl",
  })
  .then((connection) => {
    /*
    //intercation possible (convention) (important)
    USER                (Global)
    USER -> CAPACITY    (Per User)
    USER -> HOBBY       (Per User)
    CAPACITY            (Global)
    HOBBY               (Global)


    //ordre des routes  (convention)
    Get
    Get:id
    Post
    Put:id
    Delete:id
    */

    //-----------USER------------//
    app.get("/api/user", (req, res) => {
      new Promise((resolve, reject) => {
        connection
          .query("SELECT * FROM user")
          .then((ListUser) => {
            ListUser.forEach((user, i) => {
              connection
                .query(
                  `SELECT * FROM mtm_user_user_capacity AS mtm
                                        INNER JOIN user_capacity AS uc ON mtm.capacity_id = uc.id
                                        WHERE mtm.user_id = ?`,
                  [user.id]
                )
                .then((resultCapacity) => {
                  user.listCapacity = resultCapacity;

                  connection
                    .query(
                      `SELECT * FROM user_hobby 
                                        WHERE user_id = ?`,
                      [user.id]
                    )
                    .then((resultHobby) => {
                      user.listHobby = resultHobby;

                      if (i == ListUser.length - 1) resolve(ListUser);
                    })
                    .catch((error) => {
                      res.status(500).json(error);
                    });
                })
                .catch((error) => {
                  res.status(500).json(error);
                });
            });
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      })
        .then((ListUserAll) => {
          res.json(ListUserAll);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.get("/api/user/:userID", (req, res) => {
      connection
        .query("SELECT * FROM user WHERE id = ?", [req.params.userID])
        .then((User) => {
          res.json(User);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.post("/api/user", (req, res) => {
      connection
        .query(`INSERT INTO user SET ?`, {
          name: req.body.name,
          birth_year: req.body.birth_year,
          ville: req.body.ville,
        })
        .then((infos) => {
          res.status(200).json(infos);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.put("/api/user/:userID", (req, res) => {
      connection
        .query(`UPDATE user SET ? WHERE id = ?`, [
          {
            name: req.body.name,
            birth_year: req.body.birth_year,
            ville: req.body.ville,
          },
          req.params.userID,
        ])
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.delete("/api/user/:userID", (req, res) => {
      connection
        .query("DELETE FROM user WHERE id = ?", [req.params.UserID])
        .then(() => {
          res.status(200).json();
        })
        .catch(() => {
          res.status(500).json();
        });
    });
    //----------------------------//

    //-----------CAPACITY------------//

    app.get("/api/capacity", (req, res) => {
      connection
        .query("SELECT * FROM user_capacity")
        .then((ListCapacity) => {
          res.json(ListCapacity);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.get("/api/capacity/:capacityID", (req, res) => {
      connection
        .query("SELECT * FROM user_capacity WHERE id = ?", [
          req.params.capacityID,
        ])
        .then((capacity) => {
          res.json(capacity);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.post("/api/capacity", (req, res) => {
      connection
        .query("INSERT INTO user_capacity SET ?", {
          name: req.body.capacity,
        })
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.put("/api/capacity/:capacityID", (req, res) => {
      connection
        .query("UPDATE user_capacity SET ? WHERE id = ?", [
          {
            name: req.body.name,
          },
          req.params.capacityID,
        ])
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.delete("/api/capacity/:capacityID", (req, res) => {
      connection
        .query("DELETE FROM user_capacity WHERE id = ?", [
          req.params.capacityID,
        ])
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    //------------------------------//

    //-----------HOBBY------------//
    app.get("/api/hobby", (req, res) => {
      connection
        .query("SELECT * FROM user_hobby")
        .then((ListHobby) => {
          res.json(ListHobby);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.get("/api/hobby/:hobbyID", (req, res) => {
      connection
        .query("SELECT * FROM user_hobby WHERE id = ?", [req.params.hobbyID])
        .then((hobby) => {
          res.json(hobby);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    //app.post("/api/hobby") --> totalement inutile

    app.put("/api/hobby/:hobbyID", (req, res) => {
      connection
        .query("UPDATE user_hobby SET ? WHERE id = ?", [
          {
            name: req.body.name,
            frequence: req.body.frequence,
          },
          req.params.hobbyID,
        ])
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.delete("/api/hobby/:hobbyID", (req, res) => {
      connection
        .query("DELETE FROM user_hobby WHERE id = ?", [req.params.hobbyID])
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    //----------------------------//

    //-----------USER CAPACITY------------//
    app.get("/api/user/:userID/capacity", (req, res) => {
      connection
        .query(
          `SELECT * FROM mtm_user_user_capacity AS mtm
                            INNER JOIN user_capacity AS uc ON mtm.capacity_id = uc.id
                            WHERE mtm.user_id = ?`,
          [req.params.userID]
        )
        .then((listCapacityUser) => {
          res.json(listCapacityUser);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.get("/api/user/:userID/capacity/:capacityID", (req, res) => {
      connection
        .query(
          `SELECT * FROM mtm_user_user_capacity AS mtm
                        INNER JOIN user_capacity AS uc ON mtm.capacity_id = uc.id
                         WHERE user_id = ? AND capacity_id = ?`,
          [req.params.userID, req.params.capacityID]
        )
        .then((capacity) => {
          res.json(capacity);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.post("/api/user/:userID/capacity", (req, res) => {
      connection
        .query("INSERT INTO mtm_user_user_capacity SET ?", {
          user_id: req.params.UserID,
          capacity_id: req.body.newSkill,
        })
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.put("/api/user/:userID/capacity/:capacityID", (req, res) => {
      connection
        .query("UPDATE user_capacity SET ? WHERE id = ?", [
          {
            name: req.body.name,
          },
          req.params.capacityID,
        ])
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.delete("/api/user/:userID/capacity/:capacityID", (req, res) => {
      connection
        .query(
          "DELETE FROM mtm_user_user_capacity WHERE user_id = ? AND capacity_id = ?",
          [req.params.userID, req.params.capacityID]
        )
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });
    //---------------------------------//

    //-----------USER HOBBY------------//

    app.get("/api/user/:userID/hobby", (req, res) => {
      connection
        .query("SELECT * FROM user_hobby WHERE user_id = ?", [
          req.params.userID,
        ])
        .then((hobby) => {
          res.json(hobby);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.get("/api/user/:userID/hobby/:hobbyID", (req, res) => {
      connection
        .query("SELECT * FROM user_hobby WHERE user_id = ? AND id = ?", [
          req.params.userID,
          req.params.hobbyID,
        ])
        .then((hobby) => {
          res.json(hobby);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.post("/api/user/:userID/hobby", (req, res) => {
      connection
        .query("INSERT INTO user_hobby SET ?", {
          name: req.body.name,
          frequence: req.body.frequence,
          user_id: req.params.UserID,
        })
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.put("/api/user/:userID/hobby/:hobbyID", (req, res) => {
      connection
        .query("UPDATE user_hobby SET ? WHERE id = ? AND user_id = ?", [
          {
            name: req.body.name,
            frequence: req.body.frequence,
          },
          req.params.hobbyID,
          req.params.userID,
        ])
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });

    app.delete("/api/user/:userID/hobby/:hobbyID", (req, res) => {
      connection
        .query("DELETE FROM user_hobby WHERE id = ?", [req.params.hobbyID])
        .then(() => {
          res.status(200).json();
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    });
    //---------------------------//
  })
  .catch((error) => {
    res.status(500).json(error);
  });

app.listen(port, () => {
  console.log(`le serveur ecoute sur le port ${port}`);
});
