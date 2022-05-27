import express from 'express';

import CommentApi from '../api/CommentApi.js';




const router = express.Router();




router.get('/', (req, res) => {

    CommentApi.getAllComments()

        .then(items => res.render('comments/index', { title: 'Comments', comments: items }));

});




router.get('/create', (req, res) => {
    res.render('comments/create')

});




router.post('/create', (req, res) => {

    let comment = {};


    comment.description = req.body.description;
    comment.severity = req.body.severity;
    comment.status = req.body.status;
    comment.odate = req.body.cdate;
    comment.cdate = req.body.cldate;






    CommentApi.saveComment(comment)

        .then(comment => res.redirect('/comments'));
});




router.get('/edit/:id', (req, res) => {

    CommentApi.getCommentById(req.params.id)

        .then(comment => res.render('comments/edit', { comment: comment }));

});




router.post('/edit/:id', (req, res) => {

    let updatedComment = {};

    updatedComment.description = req.body.description;
    updatedComment.severity = req.body.severity;
    updatedComment.status = req.body.status;
    updatedComment.odate = req.body.cdate;
    updatedComment.cdate = req.body.cldate;

    CommentApi.updateCommentById(req.params.id, updatedComment)

        .then(() => res.redirect('/comments'));

});




router.get('/delete/:id', (req, res) => {

    CommentApi.deleteCommentById(req.params.id)

        .then(() => res.redirect('/comments'));

});




export default router; 