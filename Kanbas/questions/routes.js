import db from "../Database/index.js";

function QuestionRoutes(app) {
    app.put("/api/questions/:qid", (req, res) => {
        const { qid } = req.params;
        console.log('Update request received for quiz:', qid);
        const questionIndex = db.questions.findIndex((q) => q._id === qid);
        db.questions[questionIndex] = {
            ...db.questions[questionIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    app.delete("/api/questions/:qid", (req, res) => {
        const { qid } = req.params;
        const questionIndex = db.questions.findIndex((q) => q._id === qid);
        db.questions.splice(questionIndex, 1);
        res.sendStatus(200);
    });

    app.get("/api/quizzes/:qid/questions", (req, res) => {
        const { qid } = req.params;
        const questions = db.questions.filter((q) => q.quiz === qid);
        console.log(questions);
        res.send(questions);
    });

    app.post("/api/quizzes/:qid/questions", (req, res) => {
        const { qid } = req.params;
        const newQuestion = {
            ...req.body,
            quiz: qid,
            _id: new Date().getTime().toString(),
        };
        db.questions.push(newQuestion);
        res.send(newQuestion);
    });

    app.get("/api/questions/:qid/details", (req, res) => {
        const { qid } = req.params;
        const question = db.questions.find((q) => q._id === qid);
        res.send(question);
    });
}

export default QuestionRoutes;