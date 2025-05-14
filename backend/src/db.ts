import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
sqlite3.verbose();

export const getDBConnection = async () => {
    return open({
        filename: "./dua_main.db",
        driver: sqlite3.Database,
    });
}   