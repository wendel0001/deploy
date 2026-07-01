import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const MONGO_URI = process.env.MONGO_URI;

async function conectar_DB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Banco de dados conectado com sucesso!");
    } catch (erro) {
        console.log(`Erro ao se concetar com banco de dados: ${erro.message}`);
    };
};

export default conectar_DB;