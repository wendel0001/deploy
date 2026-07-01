import mongoose from "mongoose";

const matricula = new mongoose.Schema({
    nomeAluno:{
 type: String,
 required: [true, "nome do aluno é obrigatorio"]
    },

    idade:{
        type: Number,
        required: [true, "a idade é obrigatoria"]
        },
  
    modalidade: {
        type: String,
        required: [true, "O nome deve ser obrigatorio"],
        enum: {
            values: ["Musculação", "Funcional", "Dança"],
            message: "Digite corretamente os campos como Musculação, Funcional ou Dança"
        }
    },
    
    plano: {
        type: String,
        required: [true,"Esse campo é obrigatorio"],
        enum:{
            values: ["Mensal", "Trimestral", "Semestral"],
            message: "Digite se é Mensal, Trimestral ou Semestral"
        }
    },
   
    dataMatricula:{
        type: String,
        required: [true, "Ex: 27-05-2006"],
    },
    
    valorMensal: {
        type: Number
    },

    valorTotal:{
        type: Number
    },
    
    status: {
        type: String,
       default:"Ativa",
        enum: {
            values: ["Ativa", "Pausada","Cancelada"]
        }
    }

})
const Matricula = mongoose.model("Matricula", matricula)
export default Matricula;