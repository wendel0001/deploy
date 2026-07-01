import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import matricula from "./models/matriculas.js";
import conectar_DB from "./db.js";
import calculoTotal from "./utils/calcular_valor_total.js"
import calculoMensal from "./utils/valorMenal.js"

dotenv.config({ path: "../.env" });
conectar_DB();

const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.get(("/"), (req, res) => {
    res.json({message: "API da Academia está no ar!"});
});

app.post(("/matricula"), async (req, res) =>{
   

    try {
        const {nomeAluno,
            idade,
            modalidade,
            plano,
            dataMatricula,
          } = req.body;
       let valorTotal= calculoTotal(modalidade,plano)
       const valorMensal=calculoMensal(modalidade,plano)
        const novaMatricula = new matricula({
            nomeAluno,
            idade,
            modalidade,
            plano,
            dataMatricula,
            valorMensal,
            valorTotal
        });

        await novaMatricula.save();
        
        res.status(201).json({ message: "Matricula criada com sucesso!", matricula: novaMatricula })
    } catch (erro) {
        res.status(400).json({ message: `Erro ao criar a matricula! ${ erro.message }`})
    };
});

app.get(("/matricula"), async (req,res) => {
    try {
        const todasMatriculas = await matricula.find();
        res.status(200).json({ message: `Todos os elementos foram listados com sucesso!`, matricula: todasMatriculas })
    } catch (erro) {
        res.status(400).json({ message: `Erro ao listar as matriculas! ${ erro.message }` })
    };
});

app.get(("/matricula/busca"), async (req,res) =>{
    try {
        const nome = req.query.nome;
        const matriculas = await matricula.find({nomeAluno: { $regex: nome, $options: "i"} }); //regex busca por partes do texto e partes da string e option ignora maiúsculas e minúsculas 
        res.status(200).json({ message: "Busca efetuada com sucesso!", matricula: matriculas })
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${ erro.message }` })
    }
});

app.delete(("/matricula/:id"), async (req,res) =>{
    try {
        const id = req.params.id;
        const matriculaDeletada = matricula.findByIdAndDelete(id);

        if(!matriculaDeletada) {
            return res.status(404).json({ message: "Matricula não encontrado" });
        } else {
            res.status(200).json({ message: "Matricula deletado com sucesso!", matriculaDeletada: matriculaDeletada })

        };

    } catch (erro) {
        res.status(500).json({ message: `Erro de servidor: ${ erro.message }` });
    };
})
app.patch(("/matricula/ :id"), async (req,res)=>{
   try {
      const id = req.params.id;
      const {status} = req.body;
      const matriculaAtualizada=  await matricula.findByIdAndUpdate(id,{status: status},{runValidators: true, new: true})
         if (!matriculaAtualizada){
            return res.status(404).json({menssagem: "matricula nao encontrada!"});
         }
         res.status(200).json({menssagem: "Matricula nao encontrada!", matriculaAtualizada: matriculaAtualizada});
   } catch (error) {
      res.status(500).json({ message: `Erro de servidor: ${ error.message }` });
   }
});

app.listen((PORT), () => {
    console.log(`Conectado com a porta ${PORT} com sucesso!`);
});