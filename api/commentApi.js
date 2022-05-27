import fs from 'fs';

import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';

let _comments = null; // Comments data loaded from db.json 




class CommentApi {

    static loadDbJson() {

        return new Promise((resolve, reject) => {

            fs.readFile('db.json', 'utf8', (err, data) => {

                if (err) {

                    console.log(err);

                    reject(err);

                }

                _comments = JSON.parse(data).comments;

                resolve(_comments);

            });

        });

    }




    static saveDbJson() {

        return new Promise((resolve, reject) => {

            let commentsData = {

                "comments": _comments

            }

            const data = JSON.stringify(commentsData, null, 4);

            fs.writeFile('db.json', data, err => {

                if (err) {

                    console.log(err);

                    reject(err);

                }

                resolve();

            });

        });

    }




    static getAllComments() {

        return CommentApi.loadDbJson();

    }




    static getCommentById(id) {

        return new Promise((resolve, reject) => {

            const comment = _.find(_comments, { id: id });

            resolve(comment);

        });

    }




    static updateCommentById(id, comment) {

        return new Promise((resolve, reject) => {

            const existingCommentIndex = _.indexOf(_comments, _.find(_comments, { id }));

            comment.id = id;

            _comments.splice(existingCommentIndex, 1, comment);

            // Update db.json file for the data to be persistent and then return success 

            CommentApi.saveDbJson()

                .then(() => resolve());

        });

    }




    static saveComment(comment) {

        return new Promise((resolve, reject) => {

            comment.id = uuidv4();



            _comments.push(comment);
            console.log(_comments);

            // Update db.json file for the data to be persistent and then return success 

            CommentApi.saveDbJson()

                .then(() => resolve(comment));

        });

    }




    static deleteCommentById(id, callback) {

        return new Promise((resolve, reject) => {

            _.remove(_comments, { id: id });

            // Update db.json file for the data to be persistent and then return success 

            CommentApi.saveDbJson()

                .then(() => resolve());

        });

    }

}




export default CommentApi;