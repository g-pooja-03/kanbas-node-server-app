import db from "../Database/index.js";

function QuizRoutes(app) {
    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
        db.quizzes[quizIndex] = {
            ...db.quizzes[quizIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    app.delete("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
        db.quizzes.splice(quizIndex, 1);
        res.sendStatus(200);

    });

    app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const quizzes = db.quizzes.filter((q) => q.course === cid);
        res.send(quizzes);
    });

    app.post("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.quizzes.push(newQuiz);
        res.send(newQuiz);
    });

    app.get("/api/quizzes/:qid/details", (req, res) => {
        const { qid } = req.params;
        const quiz = db.quizzes.find((q) => q._id === qid);
        res.send(quiz);
    });
}

export default QuizRoutes;