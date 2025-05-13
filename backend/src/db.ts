import sqlite3 from "sqlite3";
import { open } from "sqlite";

sqlite3.verbose();

export const getDBConnection = async () => {
    return open({
        filename: "./dua_main.db",
        driver: sqlite3.Database,
    });
}