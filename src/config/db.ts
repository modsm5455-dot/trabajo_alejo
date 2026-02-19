import mysql from "mysql2/promise";

console.log("MYSQL_URL:", process.env.MYSQL_URL);

export const db = mysql.createPool(process.env.MYSQL_URL as string);
