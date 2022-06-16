const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { instrument } = require("@socket.io/admin-ui");
const sql = require("mssql/msnodesqlv8");
const crypto = require("crypto");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
const messages = new Set();
instrument(io, {
  auth: false,
});
var config = {
  database: "Test",
  server: "LAPTOP-705E4FCS",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};
//connect to database
sql.connect(config, (err) => {
  console.log("Connected To SQL Successfully");
  if (!err) {
    sql.query("DELETE FROM faculties", function (err, result) {
      if (err) throw err;
      console.log("Faculties Deleted");
    });
    sql.query("DELETE FROM students", function (err, result) {
      if (err) throw err;
      console.log("Students Deleted");
    });
    sql.query("DELETE FROM courses", function (err, result) {
      if (err) throw err;
      console.log("Courses Deleted");
    });
  }
});
io.on("connection", (socket) => {
  sql.query(
    `INSERT INTO faculties (client_id, name, origin, address, ac) VALUES ('${socket.id}',NULL,'${socket.handshake.headers.origin}','${socket.handshake.address}','1')`
  );
  socket.on("disconnect", () => {
    sql.query(`UPDATE faculties SET ac = '0' WHERE client_id = '${socket.id}'`);
  });
  socket.on("sendFacultyName", (facultyName) => {
    sql.query(
      `UPDATE faculties SET name = '${facultyName}' WHERE client_id = '${socket.id}'`
    );
  });
  console.log("Connected", socket.id);
  socket.on("sendStudentsCSV", (studentsList) => {
    for (let i = 1; i < studentsList.split("\r\n").length - 1; i++) {
      let line = studentsList.split("\r\n")[i].split(",");
      let first_name = line[0];
      let last_name = line[1];
      let national_code = line[2];
      let id_number = line[3];
      const userId = crypto.randomUUID();
      sql.query(
        `INSERT INTO students (client_id,user_id, first_name, last_name, national_code, id_number) VALUES ('${socket.id}','${userId}','${first_name}','${last_name}','${national_code}','${id_number}')`
      );
      for (let j = 0; j < 10; j += 2) {
        sql.query(
          `INSERT INTO courses (user_id, course_name, course_grade) VALUES ('${userId}','${
            line[j + 4]
          }','${line[j + 5]}')`
        );
      }
    }
  });
  socket.on("sendStudents", (studentsList) => {
    const userId = crypto.randomUUID();
    sql.query(
      `INSERT INTO students (client_id,user_id, first_name, last_name, national_code, id_number) VALUES ('${socket.id}','${userId}','${studentsList.first_name}','${studentsList.last_name}','${studentsList.national_code}','${studentsList.id_number}')`
    );
    for (let i = 0; i < studentsList.courses.length; i++) {
      sql.query(
        `INSERT INTO courses (user_id, course_name, course_grade) VALUES ('${userId}','${studentsList.courses[i].course_name}','${studentsList.courses[i].course_grade}')`
      );
    }
  });
  socket.on("Average", () => {
    sql.query(
      `(SELECT students.national_code,(select avg(cast(course_grade as Float))
      from students natural join courses on client_id='${socket.id}' and students.user_id=courses.user_id) as grade_avg
      from students where client_id='${socket.id}')`,
      function (err, rows) {
        if (!err) {
          socket.emit("Average-result", rows.recordset);
        }
      }
    );
  });
  socket.on("Min", () => {
    sql.query(
      `(select first_name,last_name,avg_deg
        from students  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
                 from courses group by user_id) as x
        on students.user_id = x.user_id
        where avg_deg = (SELECT min(avg_deg)
              from  students cross  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
                 from courses group by user_id) as x
                where students.user_id=x.user_id and client_id='${socket.id}'))`,
      function (err, rows) {
        if (!err) {
          console.log("first");
          socket.emit("Min-result", rows.recordset);
        }
      }
    );
  });
  socket.on("Max", () => {
    sql.query(
      `(select first_name,last_name,avg_deg
        from students  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
                 from courses group by user_id) as x
        on students.user_id = x.user_id
        where avg_deg = (SELECT max(avg_deg)
              from  students cross  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
                 from courses group by user_id) as x
                where students.user_id=x.user_id and client_id='${socket.id}'))`,
      function (err, rows) {
        if (!err) {
          socket.emit("Max-result", rows.recordset);
        }
      }
    );
  });
  socket.on("Sort", () => {
    sql.query(
      `select id_number,avg_deg
      from students  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
               from courses group by user_id) as x
      on students.user_id = x.user_id and client_id ='${socket.id}' order by avg_deg`,
      function (err, rows) {
        if (!err) {
          socket.emit("Sort-result", rows.recordset);
        }
      }
    );
  });
  socket.on("getMessages", () => {
    messages.forEach((message) => {
      io.sockets.emit("message", message);
    });
  });
  socket.on("message", (value) => {
    sql.query(
      `SELECT name,client_id from faculties
      WHERE client_id='${socket.id}'`,
      function (err, rows) {
        if (!err) {
          const message = {
            id: crypto.randomUUID(),
            user: rows.recordset[0].name,
            value: value,
            time: Date.now(),
            isYou: rows.recordset[0].client_id === socket.id,
          };
          messages.add(message);
          io.sockets.emit("message", message);
        }
      }
    );
  });
  // socket.on("getStudents", () => {
  //   sql.query(
  //     `SELECT * FROM students WHERE client_id='${socket.id}'`,
  //     function (err, rows) {
  //       var students = [];
  //       if (err) {
  //       } else {
  //         for (let i = 0; i < rows.recordset.length; i++) {
  //           const allCourses = [];
  //           sql.query(
  //             `SELECT * FROM courses WHERE user_id=${rows.recordset[i].user_id}`,
  //             function (error, c) {
  //               if (!error) {
  //                 for (let j = 0; j < c.recordset.length; j++) {
  //                   allCourses.push({
  //                     course_name: c.recordset[j].course_name,
  //                     course_grade: c.recordset[j].course_grade,
  //                   });
  //                 }
  //               }
  //             }
  //           );
  //           students.push({
  //             first_name: rows.recordset[i].first_name,
  //             last_name: rows.recordset[i].last_name,
  //             national_code: rows.recordset[i].national_code,
  //             id_number: rows.recordset[i].id_number,
  //           });
  //         }
  //         socket.emit("students", students);
  //       }
  //     }
  //   );
  // });
});
server.listen(8080, () => {
  console.log("listening on *:8080");
});
